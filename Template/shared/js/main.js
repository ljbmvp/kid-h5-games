/**
 * Created by bluesliu on 2018/6/20.
 */

var host = "http://118.25.0.212";   //服务器地址
var theRequest = {};                //url的参数
var curNodeInfo;                    //当前关卡的数据

//-------------------- 初始化 -------------------
//
(function init(){
    //获取url中"?"符后的字串
    var url = location.search;
    if (url.indexOf("?") != -1) {
        var str = url.substr(1);
        strs = str.split("&");
        for(var i = 0; i < strs.length; i ++) {
            theRequest[strs[i].split("=")[0]]=unescape(strs[i].split(strs[i].split("=")[0]+"=")[1]);
        }
    }

    Println(url);

    SetFailPanelVisible(false);
    SetSuccessPanelVisible(false);
    SetLogPanelVisible(false);
    
    //点击关闭成功面板
    $("#success_closeBtn").on("touchend",function(){
        Println("touchend closeBtn");
        SetSuccessPanelVisible(false);
    });
    //点击下一关按钮
    $("#success_nextBtn").on("touchend",function(){
        Println("touchend nextBtn");
        SetSuccessPanelVisible(false);
        NextLevel();
    });
    //点击关闭成功面板
    $("#fail_okBtn").on("touchend",function(){
        Println("touchend fail_okBtn");
        SetFailPanelVisible(false);
    });
    //点击下一关按钮
    $("#fail_closeBtn").on("touchend",function(){
        Println("touchend fail_closeBtn");
        SetFailPanelVisible(false);
    });


    // 获得当前关卡数据
    Println("获得当前关卡数据...");
    $.post(host+"/Service/Map/getMapNodeInfo",
        {
            "requestTime":timestampToTime(Date.now()),
            "requestData":{
                "nodeId":theRequest.nodeId
            },
            "userProps":
            {
                "token": theRequest.token, //登录用户的生命周期
                "bindStuId":theRequest.bindStuId//正在操作的学生ID
            }
        },
        function(data,status){
            curNodeInfo = data.retData;
            Println("type:"+curNodeInfo.type+" gold:"+curNodeInfo.gold+" gold2:"+curNodeInfo.gold2+" nextId:"+curNodeInfo.nextId);
        }
    );
})();




//-------------------- d.ts 接口 -------------------
//
// 获得请求数据
function GetRequestObject(){
    return theRequest;
}

// 游戏结束，提交关卡状态
function GameOver(isComplete, callback){
    if(curNodeInfo==null || curNodeInfo==undefined){
        Println("当前关卡数据为null，无法提交关卡")
        return;
    }
    Println("GameOver isComplete:"+isComplete);

    $.post(host+"/Service/Map/submitMapNode",
        {
            "requestTime":timestampToTime(Date.now()),
            "requestData":{
                "nodeId":theRequest.nodeId,
                "isComplete":isComplete || curNodeInfo.completed,               //如果之前任务已完成，不要修改
                "gold": isComplete ? curNodeInfo.gold : curNodeInfo.gold2
            },
            "userProps":
            {
                "token": theRequest.token,          //登录用户的生命周期
                "bindStuId":theRequest.bindStuId    //正在操作的学生ID
            }
        },
        function(data,status){

            //如果入口是任务，还要把任务提交一下
            if(theRequest.taskId!=0 && isComplete){

                $.post(host+"/Service/Task/submitTask",
                {
                    "requestTime":timestampToTime(Date.now()),
                    "requestData":{
                        "taskId": theRequest.taskId,
                        "isComplete": isComplete,
                        "gold": theRequest.taskgold
                    },
                    "userProps":
                    {
                        "token": theRequest.token, //登录用户的生命周期
                        "bindStuId":theRequest.bindStuId//正在操作的学生ID
                    }
                },
                function(data,status){
                    callback();
                }
            );

            }
            else{
                callback();
            }
        }
    );
}

// 打开下一关
function NextLevel(){
    Println("打开下一关... ...");
    if(curNodeInfo==null || curNodeInfo==undefined || curNodeInfo.nextId==undefined){
        return;
    }
    var nodeId = curNodeInfo.nextId;
    $.post(host+"/Service/Map/getMapNodeInfo",
        {
            "requestTime":timestampToTime(Date.now()),
            "requestData":{
                "nodeId":nodeId
            },
            "userProps":
            {
                "token": theRequest.token, //登录用户的生命周期
                "bindStuId":theRequest.bindStuId//正在操作的学生ID
            }
        },
        function(data,status){

            var link = "";
            if(data.retData.type == 1){
                link = host+"/h5/testH/TestH/youxi.html";
            }
            else if(data.retData.type == 2){
                link = host+"/h5/jueSebanYan/jueSebanYan/jueSebanYan.html";
            }
            else if(data.retData.type == 3){
                link = host+"/h5/tuPianXuanZe/tuPianXuanZe/tuPianXuanZe.html";
            }
            else if(data.retData.type == 4){
                link = host+"/h5/dating/dating/dating.html";
            }
            else if(data.retData.type == 5){
                link = host+"/h5/weiDongHua/weiDongHua/weiDongHua.html";
            }
            else{
                link = data.retData.link;
            }
            var url = link+"?"
                +"nodeId="+nodeId
                +"&nextId="+data.retData.nextId
                +"&token="+theRequest.token
                +"&bindStuId="+theRequest.bindStuId;
            
            //兼容data.retData.link本身就已经携带参数的情况
            var t = url.split('?nodeId=');
            var t1=t[0];
            var t2=t[1];
            if (t1.indexOf('?')>=0){
                let p = t1.split('?');
                url=p[0]+'?nodeId='+t2+'&'+p[1];
            }else{
                url=t1+'?nodeId='+t2;
            }

            Println("url:"+url);
            location.href = url;
        }
    );
}

// 设置失败面板是否可见
function SetFailPanelVisible(bool)
{
    $("#failPanel").css({visibility: bool ? "visible" : "hidden"});
    $("#maskBg").css({visibility: bool ? "visible" : "hidden"});
}

// 设置成功面板是否可见
function SetSuccessPanelVisible(bool)
{
    $("#successPanel").css({visibility: bool ? "visible" : "hidden"});
    $("#maskBg").css({visibility: bool ? "visible" : "hidden"});
}

//设置退出按钮位置。
//1：左上角
//2：左下角
function SetQuitPosition(value){
    if(value==1){
        var post1 = {type:1};
	    window.parent.postMessage(post1,'*');
    }
    else if(value==2){
        var post2 = {type:2};
	    window.parent.postMessage(post2,'*');
    }
}

function Println(text)
{
    var oldText = $("#logPanel").val();
    if(oldText == null && oldText == undefined){
        oldText = "";
    }
    $("#logPanel").val(oldText+"\n"+text);
    $("#logPanel").scrollTop = $("#logPanel").scrollHeight;
    console.log(text);
}

function SetLogPanelVisible(bool)
{
    $("#logPanel").css({visibility: bool ? "visible" : "hidden"});
}















// 时间戳
function timestampToTime(timestamp) {
    var date = new Date(timestamp);//时间戳为10位需*1000，时间戳为13位的话不需乘1000
    Y = date.getFullYear() + '-';
    M = (date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1) + '-';
    D = date.getDate() + ' ';
    h = date.getHours() + ':';
    m = date.getMinutes() + ':';
    s = date.getSeconds();
    return Y+M+D+h+m+s;
}