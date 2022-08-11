import {Table, Avatar, Typography, Button} from "web3uikit"
import { useState, useRef, useEffect } from "react";
import { useMoralis } from "react-moralis";
import axios from "axios";

const TransacTable = ({isupdate}) => {

  const [fileArr, setFileArray] = useState();
  const [fileData, setFileData] = useState();
  const { Moralis, account} = useMoralis();

  useEffect(() => {
    async function getFile() {
        try {
          const files = Moralis.Object.extend("fileStorage");
          const query = new Moralis.Query(files);
        //   query.equalTo("fileOwner", account);
          query.equalTo("isVisible", true);
        //   query.equalTo("isShare",true);
          const results = await query.find();
  
          setFileArray(results);
        } catch (error) {
          console.error(error);
        }
      }
      getFile();
    //   console.log(fileArr);
      const myfiles = fileArr;
      const tableData=[];
      {myfiles?.map(async (file) => {
    
        const name = file.attributes.fileName;
        const crateTime = file.attributes.createdAt.toLocaleString('chinese',{hour12:false});
        const owner = file.attributes.fileOwner.slice(0,10);
        const size = file.attributes.fileSize ;
        const size_KB = size / 1024;
        const size_MB = size_KB /1024;
        const size_show = size_MB.toFixed(1);
        const fileID = file.id;
        // const btns =  <>
        // <Button color="blue"  isTransparent size="small" text="共享" onClick={() => onEditbtn(fileID)}/>
        // <Button  icon="x" iconColor="red" iconLayout="icon-only" isTransparent onClick={() => onDeletebtn(fileID)}/>
        // </>
        const traceUrl = file.attributes.fileTrace;
        console.log(traceUrl);
        const res = await axios.get(traceUrl);
        const traceData = res.data;
        // traceData.reverse();
        console.log(traceData);
        {traceData?.map((trace) => {
          // console.log(trace);
          const from = trace.from.slice(0,10);
          // console.log(from);
          // if(from.length > 5) {
          //   from = from.slice(0,4) + "..." + from.slice(38);
          // }
          const to = trace.to.slice(0,10);
          // if(to.length > 5) {
          //   to = to.slice(0,4) + "..." + to.slice(38);
          // }
          const timeStamp = trace.timeStamp;
          // console.log(timeStamp);
          
        const data = [name, size_show, from, to, timeStamp];
        tableData.push(data);
        })}
        tableData.reverse();
        console.log(tableData)
      }
      )}
      setFileData(tableData);

},[isupdate])

//   async function  onEditbtn(fileID) {
//     const files = Moralis.Object.extend("fileStorage");
//     const query = new Moralis.Query(files);
//     query.equalTo("objectId", fileID);
//     const results = await query.first();
//     results.set("isShare", true);
//     await results.save()
//     // console.log(results);

//   }

//   async function  onDeletebtn(fileID) {
//     const files = Moralis.Object.extend("fileStorage");
//     const query = new Moralis.Query(files);
//     query.equalTo("objectId", fileID);
//     const results = await query.first();
//     results.set("isVisible", false);
//     await results.save()
//     // console.log(results);

//   }


    return (
      <div>
          <Table
    alignCellItems="center"
    columnsConfig=" 4fr 1.5fr 3fr 2fr 2fr"
    data={fileData}
    
    header={[
      <span>文件名</span>,
      <span>文件大小(MB)</span>,
      <span>From</span>,
      <span>to</span>,
      <span>时间</span>
    ]}
    isColumnSortable={[
      true,
      true,
      true,
      true,
      true,
    ]}
    maxPages={3}
    onPageNumberChanged={function noRefCheck(){}}
    onRowClick={function noRefCheck(){}}
    pageSize={5}
  />
      </div>
    )

  }
export default TransacTable;