module.exports = {
    cleanArray: function(arr){
        let array = [];
        arr = arr.map(element => {
            return element.replace(/[\s|"]/,'');
        });
        arr = arr.filter(element => {
            return  !(typeof(element) == 'undefined' || element === null || element == 0);
        });
        const iterator = arr.values();

        for (const value of iterator) {
            array.push(value);
        }
        return array;
    }
}