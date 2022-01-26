const { RootFolder } = require('../models/rootFolder');
const { SubFolder } = require('../models/subFolder');
let array = [], array2 = [], fName = null, count = 1, a = 0, b = 0;

module.exports.createRootFolder = async (req, res) => {
    console.log(req.body)
    const { folderName } = req.body;

    const rootFolder = new RootFolder({
        folderName,
        folderPath: `/${folderName}`
    })
    rootFolder.save()
        .then(data => {
            res.status(200).send(data)
        })
        .catch(err => {
            res.status(500).send('Something Went wrong!');
        });
}



module.exports.createFolder = async (req, res) => {
    console.log(req.body)
    const { parentFolderPath, folderName, parentFolder, rootFolder } = req.body;

    let subFolder = new SubFolder({
        folderName,
        parentFolder,
        rootFolder,
        folderPath: `${parentFolderPath}/${folderName}`
    })
    var str = subFolder.folderPath
    var arr = str.split('/')
    subFolder.layer = arr.length - 1

    subFolder.save()
        .then(async data => {
            res.status(200).send(data)
        })
        .catch(err => {
            res.status(500).send('Something Went wrong!');
        });
}


module.exports.getFolders = async (req, res) => {
    array = []
    b=0
    const id = req.params.id;
    const rootFolder = await RootFolder.findById({ _id: id })
    const folders = await SubFolder.find({ rootFolder: id })
        .sort({ layer: 1 })
    array2 = folders

    for (var i = 0; i < folders.length; i++) {
        if (folders[i].layer > a) {
            a = folders[i].layer
        }
    }

    array.push({ layer: 0, name: rootFolder.folderName, path: `/${rootFolder.folderName}`, parent: rootFolder._id })
    for (var i = 0; i < folders.length; i++) {
        if (folders[i].layer === 2) {
            fName = folders[i].folderPath;
            array.push({ layer: folders[i].layer, name: folders[i].folderName, path: folders[i].folderPath, parent: folders[i].parentFolder })
            array2[i].seen = true
            count = count + 1
            const func = () => {
                for (var j = 0; j < array2.length; j++) {
                    if (array2[j].layer > 2 && array2[j].seen === false) {
                        for (var k = 3; k < a + 2; k++) {
                            console.log("*****", `${fName}/${array2[j].folderName}`,"+++",`${array2[j].folderPath}`)
                            if (`${fName}/${array2[j].folderName}` === `${array2[j].folderPath}` && array2[j].layer === k) {
                                console.log("....", `${array2[j].folderPath}`)
                                array.push({ layer: array2[j].layer, name: array2[j].folderName, path: folders[j].folderPath, parent: folders[j].parentFolder })
                                fName = fName + `/${array2[j].folderName}`
                                array2[j].seen = true
                                count = count + 1
                            }
                        }
                    }
                }

                for (var j = 0; j < array2.length; j++) {
                    if (array2[j].layer > 2 && array2[j].seen === false) {
                        for (var l = 0; l < array2.length; l++) {
                            if (array2[l].layer > 2 && array2[l].seen === false) {
                                const myArray5 = (fName.split("/"))[3];
                                let check = ((folders[l].folderPath).split("/"))[3];
                                console.log("aaaaa", array2.length)
                                console.log("mnb", myArray5, check)
                                if (myArray5 === check) {
                                    let text4 = fName
                                    const myArray4 = text4.split("/")
                                    const length2 = ((text4.split("/")).length) - 2;
                                    myArray4.splice(0, 1)
                                    myArray4.splice(length2, 1)
                                    let myArray5 = myArray4.join("/")
                                    console.log("Hello", fName)
                                    fName = `/${myArray5}`
                                    console.log("Hi", fName)
                                    b = 1
                                    func();
                                }
                            }
                        }
                        if (b === 0) {
                            text = folders[i].folderPath
                            const myArray = (text.split("/"))[2];
                            text2 = folders[j].folderPath
                            const myArray2 = (text2.split("/"))[2];
                            if (myArray === myArray2) {
                                let text3 = folders[j].folderPath
                                const myArray3 = text3.split("/")
                                const length = ((text3.split("/")).length) - 2;
                                myArray3.splice(0, 1)
                                myArray3.splice(length, 1)
                                let myArray4 = myArray3.join("/")
                                fName = `/${myArray4}`
                                console.log("Hiii", fName)
                                b = 0
                                func();
                            }
                        }

                    }
                }

                b=0

            }
            for (var j = 0; j < array2.length; j++) {
                if (array2[j].layer > 2 && array2[j].seen === false) {
                    func()
                }
            }
        }
    }
    for (var j = 0; j < array2.length; j++) {
        console.log(array[j].path)
    }

    return res.status(200).send(array)
}








