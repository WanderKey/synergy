 // const metaData = {
      //   fileAddress : ipfsAddress,
      //   fileName : data.name,
      //   fileSize : data.size,
      //   fileType : data.type,
      // }
      // const metadataJson = JSON.stringify(metaData);
      //save file to blockchain 
      // await addFile(ipfsAddress, metadataJson);
       
      //save file to server

      //communicate with smart contract
  //add file to blockchain
  // const addFile = async (_fileAddress,_filedata) => {
  //   let options = {
  //     contractAddress : "0xEe3473ad6e49688295249F42EF8Dca3F0F0141d1",
  //     functionName : "addFile",
  //     abi : [
  //       {
  //         "inputs": [
  //           {
  //             "internalType": "string",
  //             "name": "fileAddress",
  //             "type": "string"
  //           },
  //           {
  //             "internalType": "string",
  //             "name": "fileMetadata",
  //             "type": "string"
  //           }
  //         ],
  //         "name": "addFile",
  //         "outputs": [],
  //         "stateMutability": "nonpayable",
  //         "type": "function"
  //       }
  //     ],
  //     params: {
  //       fileAddress : _fileAddress,
  //       fileMetadata : _filedata
  //     },
  //     msgValue: 0,
  //   }

  //   await contractProcessor.fetch({
  //     params: options,
  //     onSuccess: () => {
  //       console.log("Save file to blockchain successfully!")
  //     },
  //     onError: (error) => {
  //       console.log(error.data.message)
  //     }
  //   });

  // }
   // getfile
  // const getFileList = async() => {
  //   let options = {
  //     contractAddress : "0xEe3473ad6e49688295249F42EF8Dca3F0F0141d1",
  //     functionName : "getFileList",
  //     abi : [
  //       {
  //         "inputs": [],
  //         "name": "getFileList",
  //         "outputs": [
  //           {
  //             "internalType": "uint256[]",
  //             "name": "",
  //             "type": "uint256[]"
  //           },
  //           {
  //             "internalType": "string[]",
  //             "name": "",
  //             "type": "string[]"
  //           }
  //         ],
  //         "stateMutability": "view",
  //         "type": "function"
  //       }
  //     ],
  //   }
  //   const [IDlist, Filelist] = await Moralis.executeFunction(options);
  //   console.log("get file from blockchain successfully!")
  //   return {IDlist, Filelist};
  //   // setFileList(Filelist);
  //   // setIdList(IDlist);
  //   // console.log({IDlist});
  //   // console.log({Filelist});
  // }


  // //处理元数据
  // const UnifyMetadata = (IDlist, Filelist) => {
  //   if(IDlist && Filelist) {
  //     const fileList = Filelist;
  //     const idList  = IDlist;
  //     // console.log(fileIdList);
  //     const size = idList.length;
  //     let myFile =[]; 
  //     for (var i = 0; i < size; i++) {
  //       const fileJSON = JSON.parse(fileList[i]);
  //       const fileID = idList[i];
  //       // const fileID = parseInt(idList[i].hex, 16);
  //       const fileAddress = fileJSON.fileAddress;
  //       const fileName = fileJSON.fileName;
  //       const fileSize = fileJSON.fileSize;
  //       const fileType = fileJSON.fileType;
  //       myFile.push({fileID, fileAddress, fileName, fileSize, fileType});
  //     }
  //     console.log("myFile setup");
  //     return myFile;

  //   }
  // }

  // const UpLoadMetaData = async(myFile) => {
  //       // 将文件数据上传至服务器
  //     if(myFile) {
  //       const User = Moralis.Object.extend("_User");
  //       const query = new Moralis.Query(User);
  //       const myDetails = await query.first();
  //       const result = await saveFile(
  //         "myFiles.json",
  //         { base64: btoa(JSON.stringify(myFile)) },
  //         {
  //           type: "base64",
  //           saveIPFS: true,
  //         }
  //       );
  //       myDetails.set("myFiles", result.ipfs())
  //       await myDetails.save();
  //       console.log("Upload to server successfully!")
  //       setUpdate(true);
  //     }
  //   }

  //   const update = async() => {
  //     const {IDlist, Filelist} = await getFileList();
  //     const myFile  = UnifyMetadata(IDlist, Filelist);
  //     await UpLoadMetaData(myFile);
  //     console.log("All things done")
  //   }

  // useEffect(()=> {
  //     if(!isUpdataed) {
  //       update();
  //     }
  // },isUpdataed)

  // const Update = async() => {
  //   console.log("cilck");
  //   await update();
  //   window.location.reload();
  // }


    // //myFileList: 从区块链直接获取的文件数据
  // const [myFileList, setFileList] = useState();
  // const [fileIdList, setIdList] = useState();
  // //myFile：处理后的文件数据
  // const [myFile, setMyFile] = useState();