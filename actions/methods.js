const xor = require('buffer-xor');
const hexToAscii = require('../files/hexToAscii.json');

module.exports ={
    convertHexToAscii : function (buf,bool){
        buf = Buffer.from(buf, 'hex');
        bool = bool || false;
        let arr = [];
        let ascii;
        let hex;
        let len = buf.length;
        let str = '';
        for(let i = 0; i < len; i++){
            hex = buf.toString('hex',i,i+1).toUpperCase();
            ascii = hexToAscii[hex];
            arr.push(ascii);
            str = str + ascii;
        }
        if (bool) {
           return arr 
        }
        return str;
    },
    blockCheckCode : function (buf,bool){
        bool = bool || false;
        let len = buf.length;
        let tmp;
        let arr = [];
        for(let i = 0; i < len; i++){
          let char = buf.toString('hex',i,i+1);
          arr.push(char);
        }
        for (let i = 0; i < arr.length-2; i++) {
            if(i == 0){
                if (arr[0] !== '01') {
                    return new Error('START OF HEADER(01) is missing');
                }
                tmp = xor(Buffer.from(arr[i+1], 'hex'), Buffer.from(arr[i+2], 'hex'));
                continue;
            }
            tmp = xor(tmp, Buffer.from(arr[i+2], 'hex'));
        }
        if (bool == true) {
            return buf.toString('hex').toUpperCase() + tmp.toString('hex').toUpperCase() + '0D';
        }
        return tmp.toString('hex').toUpperCase();
    },
    finalHexMessage : function(hex){
        let len = hex.length;
        let result = '';
        for (let i = 0; i < len-1; i++) {
          if (hex[i] == "0" && hex[i+1] == "D") {
            result += hex[i]+hex[i+1]+'h';
            break;
          }
          result += hex[i]+hex[i+1]+'h-';
          i++;
        }
        return result;
    },
    finalAsciiMessage : function(ascii){
        let len = ascii.length;
        let result = '';
        for (let i = 0; i < len-1; i++) {
          if (ascii[i]+ascii[i+1]+ascii[i+2] == 'SOH' || 
              ascii[i]+ascii[i+1]+ascii[i+2] == 'STX' || 
              ascii[i]+ascii[i+1]+ascii[i+2]== 'ETX') 
          {
            result += ascii[i]+ascii[i+1]+ascii[i+2]+"-";
            i++
            i++
            continue;
          }
          if ( ascii[i]+ascii[i+1] == 'CR') {
            result +=  ascii[i]+ascii[i+1];
            break;
          }
          result += "'"+ascii[i]+"'-";
        }
        return result;
    }
}