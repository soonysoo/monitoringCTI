import React from 'react';

const Menubar = () => {
  return (
    <div>
       
     <nav class="navbar navbar-inverse navbar-fixed-top">
        <div class="container-fluid">
            <div class="navbar-header">
                <a class="navbar-brand" href="#">BridgeW IPT</a>
            </div>
        
            <div class="container">
                <form class="navbar-form navbar-left"> 
                    <div class="form-group">
                        <div class="btn btn-default" role="button"  id="conn_status"><span class="glyphicon glyphicon-signal"></span></div>
                        <div class="btn btn-default" role="button"  id="call_appear1">1</div>
                        <div class="btn btn-default" role="button"  id="call_appear2">2</div>
                    </div>
                    <div class="form-group" style="width:100px" >
                        <table ><tr><th id="sp_status" style="color:lightgreen; width:100px; text-align:center;font-family:arial;  font-size: 90%;">Please Login</th></tr>
                        <tr><th id="elapse_time" style="color:white; text-align:center; valign:center; width:100px; font-family:arial;  font-size: 90%;">Elapse time</th></tr>
                        </table>
                    </div>
                    
                     <a class="btn btn-default" role="button"  onclick="ct_ipt_ready()" id="btn_ready"><span class="glyphicon glyphicon-headphones" aria-hidden="true"></span></a>
                     
                    <div class="form-group dropdown">
                        <button type="button" class="btn btn-sm btn-default" data-toggle="dropdown" aria-expanded="false" id="btn_aux">
                            <span class="glyphicon glyphicon-music" aria-hidden="true"></span>
                            <span class="caret"></span>
                        </button>
                        <ul class="dropdown-menu" role="menu">
                            <li role="presentation" class="dropdown-header">Please select reason code</li>
                            <li role="presentation"><a role="menuitem" tabindex="-1" onclick="ct_ipt_aux('1')">AUX1: 교육</a></li>
                            <li role="presentation"><a role="menuitem" tabindex="-1" onclick="ct_ipt_aux('2')">AUX2: 식사</a></li>
                            <li role="presentation"><a role="menuitem" tabindex="-1" onclick="ct_ipt_aux('3')">AUX3: 업무처리</a></li>
                            <li role="presentation"><a role="menuitem" tabindex="-1" onclick="ct_ipt_aux('4')">AUX4: 휴식</a></li>
                            <li role="presentation"><a role="menuitem" tabindex="-1" onclick="ct_ipt_aux('5')">AUX5: 실적제외</a></li>
                            <li role="presentation"><a role="menuitem" tabindex="-1" onclick="ct_ipt_aux('6')">AUX6: 미팅</a></li>
                            <li role="presentation"><a role="menuitem" tabindex="-1" onclick="ct_ipt_aux('7')">AUX7: 멘토링</a></li>
                            <li role="presentation"><a role="menuitem" tabindex="-1" onclick="ct_ipt_aux('8')">AUX8: 관리자</a></li>
                            <li role="presentation"><a role="menuitem" tabindex="-1" onclick="ct_ipt_aux('9')">AUX9: 전상장애</a></li>
                        </ul>
                    </div>

                    <a class="btn btn-default"  role="button" id="btn_acw" onclick="ct_ipt_acw()"><span class="glyphicon glyphicon-pencil" aria-hidden="true"></span></a>
                </form>
                   
                <form class="navbar-form navbar-left">
                     <input type="text" class="form-control" placeholder="make dest" size="12" id="make_dest"/>
                    <a class="btn btn-default"  role="button" id="btn__make"     onclick="ct_make()" ><span class="glyphicon glyphicon-phone-alt" aria-hidden="true"></span></a>
                    <a class="btn btn-default"  role="button" id="btn_clear"    onclick="ct_clear()"><span class="glyphicon glyphicon-scissors" aria-hidden="true"></span></a>
                     <a class="btn btn-default"  role="button" id="btn_answer"   onclick="ct_answer()"><span class="glyphicon glyphicon-earphone" aria-hidden="true"></span></a>
                </form>
                 <form class="navbar-form navbar-left" role="search">
                    <a class="btn btn-default"  role="button" id="btn_hold"     onclick="ct_hold()"><span class="glyphicon glyphicon-pause" aria-hidden="true"></span></a>
                    <a class="btn btn-default"  role="button" id="btn_retrieve" onclick="ct_retrieve()"><span class="glyphicon glyphicon-play" aria-hidden="true"></span></a>
                </form>
                   
                <form class="navbar-form navbar-left" role="search">
                        
                    <a class="btn btn-default"  role="button" id="btn_consult"  data-toggle="modal" data-target="#mdl-consult"><span class="glyphicon glyphicon-random" aria-hidden="true"></span></a>
                        
                    <a class="btn btn-default"  role="button" id="btn_password" data-toggle="modal" data-target="#mdl-password"><span class="glyphicon glyphicon-paperclip" aria-hidden="true"></span></a>
                    
                    <a class="btn btn-default"  role="button" id="btn_fwd" data-toggle="modal" data-target="#mdl-fwd"><span class="glyphicon glyphicon-export" aria-hidden="true"></span></a>
                </form>
                    
                <ul class="nav navbar-nav navbar-right">
                    <li class="dropdown">
                        <a href="#" class="dropdown-toggle" data-toggle="dropdown" role="button"  id="btn_logon" aria-hidden="true"><span class="glyphicon glyphicon-log-in" aria-hidden="true"></span> Login<span class="caret"></span></a>
                        <ul class="dropdown-menu" role="menu">
                            <form class="navbar-form"  role="form">
                                <center><h5><span class="label label-primary">Login/Logout</span></h5></center>
                                <li><div class="form-group"><h6>Station: (Mandatory)</h6><input type="text" placeholder="Station" class="form-control input-sm" id="station" required/></div></li>
                                <li><div class="form-group"><h6>Agent ID: (Mandatory)</h6><input type="text" placeholder="AgentID" class="form-control input-sm" id="agentid" required/></div></li>
                                <li class="divider"></li>
                                <li>
                                    <div >
                                        <a class="btn btn-default"  id="btn_login"  onclick="ct_ipt_connect_login()"  type="submit" >IN <span class="glyphicon glyphicon-log-in" ></span></a>                        
                                        <a class="btn btn-default"  id="btn_logout" onclick="ct_ipt_logout_disconnect()" type="submit" >OUT <span class="glyphicon glyphicon-log-out"></span></a>
                                    </div>
                                </li>
                            </form>
                        </ul>
                    </li>
                    
                    <li class="dropdown">
                        <a href="#" class="dropdown-toggle" data-toggle="dropdown" role="button" aria-expanded="false" id="ct_config"><span class="glyphicon glyphicon-cog" aria-hidden="true"></span> Setting<span class="caret"></span></a>
                        <ul class="dropdown-menu" role="menu" >
                            <form class="navbar-form">
                                <center><h5><span class="label label-primary">Connection Parameter</span></h5></center>
                                <li><div class="form-group"><h6>Server IP</h6><input type="text" placeholder="Server IP" class="form-control input-sm" id="server_ip"/></div></li>
                                <li><div class="form-group"><h6>Server Port</h6><input type="text" placeholder="Server Port" class="form-control input-sm" id="server_port"/></div></li>
                                <li class="divider"></li>
                                <li>
                                    <div >
                                        <a class="btn btn-default"  id="btn_connect"    onclick="ct_connect()"     >Con. <span class="glyphicon glyphicon-log-in" aria-hidden="true"></span></a>
                           
                                        <a class="btn btn-default"  id="btn_disconnect" onclick="ct_disconnect()"  >Dis. <span class="glyphicon glyphicon-log-out" aria-hidden="true"></span></a>
                                    </div>
                                </li>
                         </form>
                        </ul>
                    </li>    
                </ul>
            </div>
        </div> 
    </nav>

    </div>
  );
};

export default Menubar;