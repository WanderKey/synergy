// SPDX-License-Identifier: MIT

pragma solidity ^0.8.11;

contract fileManager {

    address public owner;
    uint256 private counter;

    constructor() {
        counter = 0;
        owner = msg.sender;
    }

    struct file {
        uint256 id;
        address owner;
        string fileMetadata;
        string fileAddress;
    }

    //文件存储池
    mapping(uint256 => file) public fileStorage;

    //文件共享池
    mapping(uint256 => uint256) public sharePool;

    //记录用户拥有的文件
    mapping(address => uint256[]) public ownerFile;

    //记录用户共享的文件
    mapping(address => uint256[]) public ownerShare;

    //记录用户拥有的文件数量
    mapping(address => uint256) public ownerCounter;

    function addFile (
        string memory fileAddress,
        string memory fileMetadata) public 
        {
            //将文件加入存储池
            file storage newFile = fileStorage[counter];
            newFile.id = counter;
            newFile.owner = msg.sender;
            newFile.fileMetadata = fileMetadata;
            newFile.fileAddress = fileAddress;
            //将文件加入用户文件池
            ownerFile[newFile.owner].push(newFile.id);
            ownerCounter[newFile.owner]++;
            counter++;
    }

    function getFiles (address ownerAddress) public view returns ( string[] memory ) {
        uint256  count = ownerCounter[ownerAddress];
        uint256[] memory list = new uint256[](count);
        list = ownerFile[ownerAddress];
        string[] memory files = new string[](count);
        for(uint256 i = 0; i < counter; i++) {
            files[i] = fileStorage[list[i]].fileMetadata;
        }
        return files;
    }


    


}