import {Table,  Button} from "web3uikit"
import { useState, useRef, useEffect } from "react";
import { useMoralis, useMoralisFile} from "react-moralis";
import axios from "axios";

const MarketTable = ({isupdate}) => {

  const [fileArr, setFileArray] = useState();
  const [fileData, setFileData] = useState();
  const { Moralis, account} = useMoralis();
  const user = Moralis.User.current();
  const { saveFile } = useMoralisFile();

  useEffect(() => {
    async function getFile() {
        try {
          const files = Moralis.Object.extend("fileStorage");
          const query = new Moralis.Query(files);
          query.equalTo("isShare",true);
          const results = await query.find();
          setFileArray(results);
        } catch (error) {
          console.error(error);
        }
      }
      getFile();
      // console.log(fileArr);
      const myfiles = fileArr;
      const tableData=[];
      {myfiles?.map((file, i) => {
    
        const name = file.attributes.fileName;
        // const crateTime = file.attributes.createdAt.toLocaleString('chinese',{hour12:false});

        const owner = file.attributes.fileOwner.slice(0,10);
        const share = file.attributes.shareFrom.slice(0,10);
        const fileID = file.id;
        const size = file.attributes.fileSize ;
        const size_KB = size / 1024;
        const size_MB = size_KB /1024;
        const size_show = size_MB.toFixed(1);
        const btns =  <>
        <Button color="blue"  isTransparent size="small" text="获取" onClick={() => onEditbtn(fileID)}/>
        {/* <Button  icon="x" iconColor="red" iconLayout="icon-only" isTransparent onClick={() => onDeletebtn(fileID)}/> */}
        </>
        const data = [i+1 , name, size_show, owner,share, btns];
    
        tableData.push(data);
      }
      )}
      // console.log(tableData);
      setFileData(tableData);

},[isupdate])

  async function  onEditbtn(fileID) {
    const files = Moralis.Object.extend("fileStorage");
    const query = new Moralis.Query(files);
    query.equalTo("objectId", fileID);
    const results = await query.first();

    //将文件添加到用户获取的文件列表中
    const User = Moralis.Object.extend("_User");
    const userquery = new Moralis.Query(User);
    const myDetails = await userquery.first();

    const fileListUrl = myDetails.attributes.fileList;
    const fileList = [];

    if(fileListUrl) { 
      const results = await axios.get(fileListUrl);
      const myfiles = results.data;
      {myfiles.map((file) => {
        fileList.push(file);
      })}
      console.log(myfiles);
    }

    const newFile = {
      ID : fileID,
      size : results.attributes.fileSize,
      fileName: results.attributes.fileName,
      owner : results.attributes.fileOwner,
      address : results.attributes.fileAddress,
    }
    fileList.push(newFile);
    const JSONList = await saveFile (
      "fileList.json",
      { base64: btoa(JSON.stringify(fileList)) },
      {
        type: "base64",
        saveIPFS: true,
      }
    );
    console.log(fileList);
    myDetails.set("fileList", JSONList.ipfs());
    console.log(JSONList.ipfs());
    await myDetails.save();


    //获取文件地址和trace数据
    // const fileAddress = results.attributes.fileAddress;
    const traceUrl = results.attributes.fileTrace;
    const shareFrom = results.attributes.shareFrom;
    // console.log(traceUrl);
    //将记录添加到trace数据中
    const date = new Date();
    const currentTime = date.toLocaleString('zh',{timeZone:"Asia/Shanghai"});
    const res = await axios.get(traceUrl);
    const traceData = res.data;
    const newTrace = {
      from: shareFrom,
      to: user.attributes.ethAddress,
      timeStamp : currentTime,
    }
    traceData.push(newTrace);
    const JSONTrace = await saveFile(
      "fileTrace.json",
        { base64: btoa(JSON.stringify(traceData)) },
        {
          type: "base64",
          saveIPFS: true,
        }
      );
    results.set("fileTrace",JSONTrace.ipfs());
    // console.log(traceData);
 
    // results.set("isShare", true);
    await results.save()
    alert("获取文件成功！")

  }

  // async function  onDeletebtn(fileID) {
  //   const files = Moralis.Object.extend("fileStorage");
  //   const query = new Moralis.Query(files);
  //   query.equalTo("objectId", fileID);
  //   const results = await query.first();
  //   results.set("isVisible", false);
  //   await results.save()

  // }


    return (
      <div>
          <Table
    alignCellItems="center"
    columnsConfig="0.7fr 4fr 1.5fr 3fr 3fr 2fr"
    data={fileData}
    
    header={[
      <span>#</span>,
      <span>文件名</span>,
      <span>文件大小(MB)</span>,
      <span>创建者</span>,
      <span>共享者</span>,
      ""
    ]}
    isColumnSortable={[
      true,
      true,
      true,
      true,
      false
    ]}
    maxPages={3}
    onPageNumberChanged={function noRefCheck(){}}
    onRowClick={function noRefCheck(){}}
    pageSize={5}
  />
      </div>
    )

  }
export default MarketTable;