import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';


const useStyles = makeStyles((theme)=>({
    root: {
      width: '100%',
      padding : 25,
      height: 300,
    },
    logviewer : {
      overflow: 'scroll',
      width : '100%',
      height: 500,
      margin: theme.spacing(2),
      marginLeft: theme.spacing(1),
      marginRight: theme.spacing(1),
    }
  }));
  function processFile(file){
    let reader = new FileReader();
    console.log(reader)
    reader.readAsText(file,"UTF-8");

    reader.onload=function(){
      document.getElementById('output').innerText = reader.result;
    }
  }
  
export default function CryptoLog() {
    const classes = useStyles();

    const openTextFile = () =>{
      let input = document.createElement("input");

      input.type = "file";
      input.accept = "text/plain";

      input.click();
      input.onchange=function(event){
        processFile(event.target.files[0]);
      }
    }
    return (
      <div className={classes.root}>
        <Button onClick={openTextFile} variant="outlined">로그파일 불러오기</Button>
        <div id="output" className={classes.logviewer} > 로그파일을 불러와서 확인하세요 </div>
      </div>
  );
}