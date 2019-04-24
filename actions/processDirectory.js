// let str;
module.exports = function(str,check, res){
    console.log(str);
    res.end();
    let arr = [];
    let directeory_data = []
    // conn.on('data', (data)=>{
        // str += data.toString();
        if(str.match(/(gaddrbook )[A-Za-z0-9\s\W]+(done)/g) !== null){
            str = str.split("\r\n");
            str = str.map(function(element){
                return element.replace('\n', '')
            })
            str = str.map(function(element){
                return element.replace('"\n', '" ')
            })
            
            str.forEach(element => {
                let name = element.match(/(")[a-zA-Z0-9\s]+(")/g);
                if (name !== null) {
                    name =  name[0].replace(/\s+/g, "-");
                    element = element.replace(/(")[a-zA-Z0-9\s]+(")/, name);
                }
                let el = element.split(" ");
                el = el.map(val => {
                    name = val.match(/(")[a-zA-Z0-9\-]+(")/g)
                    if (name !== null) {
                        name = name[0].replace(/[\-]+/g, " ")
                    }
                    val = val.replace(/(")[a-zA-Z0-9\-]+(")/g,name)
                    val = val.replace(/[\"]/g,'')
                    if (val.match(/[\:]/g) !== null) {
                        let obj = {};
                        val = val.split(":")
                        obj[val[0]] = val[1];
                        return obj;
                    }
                    return val
                });
                arr.push(el)
    
            });
            switch (check) {
                case 'all':
                    arr.forEach(value => {
                        let detail = {};
                        let details = {};
                        value.forEach(val => {
                            if (!isNaN(parseInt(val))) {
                                detail.index = val.match(/(\d+)/g)[0];
                            }
                            if (typeof val.name !== "undefined") {
                                detail.id = val.name
                            }else{
                                detail.id = value[2];
                            }
                            if(val.sip_num !== null && typeof val.sip_num !== "undefined"){
                                if (val.sip_num.length == 0) {
                                    detail.sip_num = ''
                                }else{
                                    detail.sip_num = val.sip_num
                                }
                            }
                            if (val.phone_num !== null && typeof val.phone_num !== 'undefined') {
                                detail.phone_num = val.phone_num
                            }else if(val.h323_num !== null && typeof val.h323_num !== 'undefined'){
                                detail.phone_num = val.h323_num
                            }else{
                                detail.phone_num = ""
                            }
                        })
                        if (detail.id !== "done") {
                            details.index = (typeof detail.index !== 'undefined') ? detail.index : '';
                            details.id = (typeof detail.id !== 'undefined' ) ? detail.id : '';
                            details.sip_num = (typeof detail.sip_num !== 'undefined') ? detail.sip_num : '';
                            details.phone_num = (typeof detail.phone_num !== 'undefined') ? detail.phone_num : '';
                        }
                        directeory_data.push(details)
                    });
                    res.send(directeory_data)
                    // return directeory_data;
                case 'system':
                    arr.forEach(value => {
                        let detail = {};
                        value.forEach(val => {
                            if (!isNaN(parseInt(val))) {
                                detail.index = val.match(/(\d+)/g)[0];
                            }
                            if (val.name) {
                                detail.id = val.name
                            }
                            if(val.sip_num){
                                detail.sip_num = val.sip_num
                            }
                            if (val.phone_num) {
                                detail.phone_num = val.phone_num
                            }
                            if(val.h323_num){
                                detail.h323_num = val.h323_num
                            }
                        })
                        directeory_data.push(detail)
                    });
                    res.send(directeory_data)
                    // return directeory_data;
                case 'group':
                    arr.forEach(value => {
                        let detail = {};
                        value.forEach(val => {
                            if (!isNaN(parseInt(val))) {
                                detail.index = val.match(/(\d+)/g)[0];
                            }
                            if (val.group) {
                                detail.id = val.group
                            }
                            if(val.sip_num){
                                detail.sip_num = val.sip_num
                            }
                            if (val.phone_num) {
                                detail.phone_num = val.phone_num
                            }
                            if(val.h323_num){
                                detail.h323_num = val.h323_num
                            }
                        })
                        directeory_data.push(detail)
                    });
                    res.send(directeory_data)
                    // return directeory_data;
    
                default:
                    break;
            }
        }
}