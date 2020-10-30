(function(){

    function getParameterByName(name, url) {
        if (!url) url = window.location.href;
        name = name.replace(/[\[\]]/g, '\\$&');
        var regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
            results = regex.exec(url);
        if (!results) return null;
        if (!results[2]) return '';
        return decodeURIComponent(results[2].replace(/\+/g, ' '));
    }

	console.log('checkSystemRequirements');
	console.log(JSON.stringify(ZoomMtg.checkSystemRequirements()));

    ZoomMtg.preLoadWasm();
    ZoomMtg.prepareJssdk();
    
    testTool = window.testTool;

    var name = getParameterByName('zn');
    var email = getParameterByName('ze');
    var leave_url = getParameterByName('zl');
    var apk = getParameterByName('zk');

    $(document).ready(function(){

        var meetConfig = {
            apiKey: apk,
            meetingNumber: getParameterByName('zid'),
            userName: decodeURIComponent(name),
            userEmail: decodeURIComponent(email),
            passWord: getParameterByName('zp'),
            leaveUrl: decodeURIComponent(leave_url),
            role: 0
        };

        testTool.setCookie("meeting_number", meetConfig.meetingNumber);
        testTool.setCookie("meeting_pwd", meetConfig.passWord);
        
        var signature = getParameterByName('zs');

        // var signature = ZoomMtg.generateSignature({
        //     meetingNumber: meetConfig.meetingNumber,
        //     apiKey: meetConfig.apiKey,
        //     apiSecret: meetConfig.apiSecret,
        //     role: meetConfig.role,
        //     success: function(res){
        //         console.log(res.result);
        //     }
        // });

        if(name !== null && leave_url !== null && apk !== null){
            ZoomMtg.init({
                leaveUrl: meetConfig.leaveUrl,
                success: function () {
                    ZoomMtg.join(
                        {
                            meetingNumber: meetConfig.meetingNumber,
                            userName: meetConfig.userName,
                            userEmail: meetConfig.userEmail,
                            signature: signature,
                            apiKey: meetConfig.apiKey,
                            passWord: meetConfig.passWord,
                            success: function(res){
                                $('#nav-tool').hide();
                                console.log('join meeting success');
                            },
                            error: function(res) {
                                console.log(res);
                            }
                        }
                    );
                },
                error: function(res) {
                    console.log(res);
                }
            });
        }   

    });

})();
