#!/usr/bin/env zx

let previousSearch = []
const fileName = "portlogs.txt";

const handleOutput = (output) => {

  const existingPorts = fs.readFileSync(fileName).toString().replace(/\r\n/g,'\n').split('\n').reduce((acc, portLine) => {
    const portInfoArray = portLine.split(" ")
    const portId = portInfoArray[1]
    if(portId){
      acc.push(portId)
    }
    return acc
  }, []);

  fs.appendFile(fileName, `------------${new Date()}-------------\n`);

  const portArray = output.split("\n");
  portArray.shift()

  for(let port of portArray) {
    const portInfoArray = port.split(" ")
    const portId = portInfoArray[1]
    if(portId && !existingPorts.includes(portId)){
      fs.appendFile(fileName, `${port}\n`);
    }
  }
  fs.appendFile(fileName, `---------------------------------------\n\n`);

}


(async () => {
  const grab = async () => {
    setTimeout(async () => {
      let response = await $`lsof -i | awk '{print $1,$2,$9}'`

      handleOutput(response.stdout)
      await grab()
    }, 60000)
  }
  await grab()
})()