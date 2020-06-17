function getHostname(){
  var path=require("path")
  var {PythonShell} =  require('python-shell');
  var opt ={
    pythonPath:'/usr/bin/python2.7'
  }
PythonShell.run(path.join(__dirname,'scripts/hyp_name.py'),  opt,function  (err, results)  {
    if  (err)  {alert(err);throw err };
    alert('Hypervisor: '+ results[0]);
  });

}

function listVms(){
  var path=require("path")
  var {PythonShell} =  require('python-shell');
  var opt ={
    pythonPath:'/usr/bin/python2.7'
  }

  PythonShell.run(path.join(__dirname,'scripts/listVms.py'),  opt,function  (err, results)  {
    if  (err)  {alert(err);throw err;}
    var state;

    $("#vms tr").remove();
    if (results!=null){
      for(var i=0;i<results.length;i++){
        var vm=JSON.parse(results[i])

        // Find a <table> element with id="myTable":
        var table = document.getElementById("vms");

        // Create an empty <tr> element and add it to the 1st position of the table:
        var row = table.insertRow(0);

        // Insert new cells (<td> elements) at the 1st and 2nd position of the "new" <tr> element:
        var cell1 = row.insertCell(0);
        var cell2 = row.insertCell(1);
        var cell3 = row.insertCell(2);
        var cell4 = row.insertCell(3);

        switch(vm.state) {
          case "-1":
            state="OFF"
            break;
          case "1":
            state="RUNNING"
            break;
          case "3":
            state="PAUSED"
            break
          default:
            state="UNDEFINED"
      }
        // Add some text to the new cells:
        cell1.innerHTML = vm.name;
        cell2.innerHTML = state;
        cell3.innerHTML = vm.maxmem;
        cell4.innerHTML = vm.nbcpu;
      }
      var header = table.createTHead();

      // Create an empty <tr> element and add it to the first position of <thead>:
      var row = header.insertRow(0);


      // Insert a new cell (<td>) at the first position of the "new" <tr> element:
      var cell1 = row.insertCell(0);
      var cell2 = row.insertCell(1);
      var cell3 = row.insertCell(2);
      var cell4 = row.insertCell(3);



      // Add some bold text in the new cell:
      cell1.innerHTML = "<b>Name</b>";
      cell2.innerHTML = "<b>State</b>";
      cell3.innerHTML = "<b>Max MEMORY</b>";
      cell4.innerHTML = "<b>NUMBER OF CPUS</b>";
      //WHEN A ROW IS CLICKED
      $('.table > tbody > tr').click(function(e) {
        var name=$(this).find('td:first').text();//NAME OF THE VM
        var st=$(this).find('td:nth-child(2)').text();//State OF THE VM
        swal("What do you want to do with: "+name+" ?", {
            buttons: {
                  start: {
                    text: "Start",
                    value: "start",
                  },
                  suspend: {
                    text: "Suspend",
                    value: "suspend",
                  },
                  resume: {
                    text: "Resume",
                    value: "resume",
                  },
                  stop: {
                    text: "Clean shudown",
                    value: "stop",
                  },
                  destroy: {
                    text: "Force Stop",
                    value: "destroy",
                  },
                  getip: {
                    text: "Show Ip",
                    value: "getip",
                  }
                },
         })
        .then((value) => {
            var h;
              switch (value) {

                  case "start":
                      if (st=="OFF"){
                        startVm(name);
                        h=setTimeout(()=>{
                            listVms();
                        },500);
                        //clearTimeout(h)

                      }
                      else{
                    alert("already running or paused !")
                      }
                      break;

                  case "destroy":
                      if (st=="RUNNING" || st=="PAUSED"){
                        destroyVm(name)
                         h=setTimeout(()=>{
                             listVms();
                         },500);
                         //clearTimeout(h)
                         //listVms();
                      }

                      else{
                        alert("already shutdown !")
                      }
                      break;

                  case "stop":
                      if (st=="RUNNING" || st=="PAUSED"){
                        stopVm(name)
                        h=setTimeout(()=>{
                            listVms();
                        },500);
                      //  clearTimeout(h)
                      }
                      else{
                        alert("already shutdown !")
                      }
                      break;

                  case "resume":
                      if (st=="PAUSED"){
                        resumeVm(name)
                        h=setTimeout(()=>{
                            listVms();
                        },500);
                        //clearTimeout(h)
                      }
                      else{
                        alert("already running or shutdown !")
                      }
                      break;

                  case "suspend":
                      if (st=="RUNNING"){
                        suspendVm(name)
                        h=setTimeout(()=>{
                            listVms();
                        },500);
                        //clearTimeout(h)
                      }
                      else{
                        alert("already paused or shutdown !")
                      }
                      break;

                  case "getip":
                      getIpAddresses();

                  default:
                      console.log("smth")
                }
              });
      });
    }


  });
}

function suspendVm(name){
  var path=require("path")
  var {PythonShell} =  require('python-shell');
  var opt ={
    pythonPath:'/usr/bin/python2.7',
    args:[name]
  }

  PythonShell.run(path.join(__dirname,'scripts/suspendVm.py'),  opt,function  (err, results)  {
    if  (err)  {alert(err);throw err;}
  })
}

function resumeVm(name){
  var path=require("path")
  var {PythonShell} =  require('python-shell');
  var opt ={
    pythonPath:'/usr/bin/python2.7',
    args:[name]
  }

  PythonShell.run(path.join(__dirname,'scripts/resumeVm.py'),  opt,function  (err, results)  {
    if  (err)  {alert(err);throw err;}
})
}

function startVm(name){
  var path=require("path")
  var {PythonShell} =  require('python-shell');
  var opt ={
    pythonPath:'/usr/bin/python2.7',
    args:[name]
  }

  PythonShell.run(path.join(__dirname,'scripts/startVm.py'),  opt,function  (err, results)  {
    if  (err)  {alert(err);throw err;}
})
}

function stopVm(name){
  var path=require("path")
  var {PythonShell} =  require('python-shell');
  var opt ={
    pythonPath:'/usr/bin/python2.7',
    args:[name]
  }

  PythonShell.run(path.join(__dirname,'scripts/stopVm.py'),  opt,function  (err, results)  {
    if  (err)  {alert(err);throw err;}
})
}

function destroyVm(name){
  var path=require("path")
  var {PythonShell} =  require('python-shell');
  var opt ={
    pythonPath:'/usr/bin/python2.7',
    args:[name]
  }

  PythonShell.run(path.join(__dirname,'scripts/destroyVm.py'),  opt,function  (err, results)  {
    if  (err)  {alert(err);throw err;}
})
}

function getIpAddresses(name){
  var path=require("path")
  var {PythonShell} =  require('python-shell');
  var opt ={
    pythonPath:'/usr/bin/python2.7',
    args:[name]
  }

  PythonShell.run(path.join(__dirname,'scripts/vmIpAddress.py'),  opt,function  (err, results)  {
    if  (err)  {alert(err);throw err;}
    else{
      alert(results)
    }
  })
}
