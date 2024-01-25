
module.exports =
{
    CompareTest:function(){
        // random Math
        var a = 1;
        var b = 2;
        if (a < b){
            return true;
        } else if (b > a)
        {
            return false;
        }
    },
    SomeDivision:function(){
        var a = 4;
        var b = 2;
        var c = a / b;

        return c;
    },
    IsUserLoaded:function(){
        var user = {
            name: 'John',
            age: 0,
            isAdmin: true
          };
        return user;
    },
    // make a script that gets the <div id="ScriptContents"></div> so we can show off the contents of the script
    SetScriptContents:function(data, Name){
        var script = document.getElementById(Name);
        script.textContent = "This is the script contents";
        if (data !== undefined)
        {
            script.textContent = data;
        }
    }
}


