<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform" xmlns="http://www.w3.org/1999/xhtml" xmlns:ee="http://enterprise-elements.com/template-tag">
    <xsl:output doctype-public="-//W3C//DTD XHTML 1.0 Transitional//EN" doctype-system="http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd" method="xml"
        omit-xml-declaration="no" />
    <xsl:param name="verb" />
    <xsl:param name="tid" />
    <xsl:param name="pid" />
    <xsl:param name="type" />
    <xsl:param name="title" />
    <xsl:param name="headline" />
    <xsl:param name="remark" />
    <xsl:param name="referer" />
    <xsl:param name="topId" />
    <xsl:param name="reply" />
    <xsl:template match="/">
        <html>
            <head>
                <title>
                    <xsl:value-of select="$headline" />
                </title>
                <ee:script-include />
                <ee:css-include />                
                 <script type="text/javascript" src="../script/yui/build/editor/simpleeditor-min.js"> </script>
                 <link rel="stylesheet" type="text/css" href="../css/base.css"></link>
                <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
                <script src="../script/yui/build/utilities/utilities.js" type="text/javascript" > </script>
                <script type="text/javascript">function load(){ ee.ge('DISCUSSION.TITLE').focus(); }</script>
                <script type="text/javascript" src="../script/ee/suggestForm.js" > </script>
                
                <style type='text/css'>
                   /* div#discussionRemark_toolbar div.yui-toolbar-titlebar h2 { display:none; }*/
                    
                    #blTD{border:none;} 
                    #buttonTD{border:none;}
                    #content-div textarea{display:block; margin-bottom: 1em; border:1px solid #80a0a0; width:100%;} 
                    #content-div{margin-bottom: 1em;} 
                    #content-div input{display:block; margin-bottom: 1em;border:1px solid #80a0a0; width:100%;}
                    #content-div label{width:25%; display:block; font-weight: 600;}
                    #df{ margin:0;padding:0; }
                
                    
                </style>
                <script type="text/javascript" xml:space="preserve">
    //<![CDATA[
        YAHOO.util.Event.onDOMReady(function()
        {
           setTimeout(function(){document.getElementById('discussionTitle').focus();}, 150);
           load();
        });            
    //]]></script>
            </head>
            <body  class="yui-skin-sam">
            
             <xsl:if test="$reply = 'false'" >
             <div id="hd">
                <div id="heading">
                    <ee:nav-bar linkSet="portal">
                        <ee:include name="ElementsUtilityMenu" />
                        <ee:include name="HomeMenu" />
                    </ee:nav-bar>
                    <a href="#content-start" id="content-start" name="content-start" accesskey="2"></a>
                    <h1 id="siteName">
                         <xsl:value-of select="$headline" />
                    </h1>
                </div>
               </div>
             </xsl:if>
             <div id="bd">
             <ee:bread-crumbs />
                <div id="content">
                    <div class="outer230">
                        <div id="subhead" class="inner230" >
                            <form id="df" method="post" action="../request/discussion" name="df">
                                <input type="hidden" name="verb" value="{$verb}" />
                                <input type="hidden" name="pid" value="{$pid}" />
                                <input type="hidden" name="type" value="{$type}" />
                                <input type="hidden" name="tid" value="{$tid}" />
                                <input type="hidden" name="referer" value="{$referer}" />
                                <input type="hidden" name="topId" value="{$topId}" />
                                <div id="content-div">
                                    <label for="DISCUSSION.TITLE">Title:</label>
                                    <textarea cols="80" rows="1" name="DISCUSSION.TITLE" id="discussionTitle" style="height:18px;width:100%;" >
                                        <xsl:value-of select="$title" />
                                    </textarea>
                                    <label for="DISCUSSION.REMARK" style="margin-top:1.5em;">Remark:</label>
                                    <textarea rows="20" cols="80" name="DISCUSSION.REMARK" id="discussionRemark" >
                                        <xsl:value-of select="$remark" />
                                    </textarea>
                                    
                                    <script type="text/javascript">
                                    
                                       var remarkEditor;
                                       
                                       YAHOO.util.Event.onContentReady('discussionRemark', function() 
                                       {
                                           var  Dom = YAHOO.util.Dom;
                                           var  Event = YAHOO.util.Event;
                                       
                                           var editConfig = {
                                               height: '400px',
                                               width: '100%',
                                             draggable: false,
                                             buttons: [
                                                 
                                                 { group: 'textstyle', label: 'Font Style',
                                                     buttons: [
                                                         { type: 'push', label: 'Bold CTRL + SHIFT + B', value: 'bold' },
                                                         { type: 'push', label: 'Italic CTRL + SHIFT + I', value: 'italic' },
                                                         { type: 'push', label: 'Underline CTRL + SHIFT + U', value: 'underline' }
                                                     ]
                                                 },
                                                 { type: 'separator' },
                                                 { group: 'indentlist', label: 'Lists',
                                                     buttons: [
                                                         { type: 'push', label: 'Create an Unordered List', value: 'insertunorderedlist' },
                                                         { type: 'push', label: 'Create an Ordered List', value: 'insertorderedlist' }
                                                     ]
                                                 },
                                                 { type: 'separator' },
                                                 { group: 'insertitem', label: 'Insert Item',
                                                     buttons: [
                                                         { type: 'push', label: 'HTML Link CTRL + SHIFT + L', value: 'createlink', disabled: true },
                                                         { type: 'push', label: 'Insert Image', value: 'insertimage' }
                                                     ]
                                                 }
                                             ]
                                             };
                                           remarkEditor = new YAHOO.widget.SimpleEditor('discussionRemark', editConfig);
                                           remarkEditor._defaultToolbar.titlebar = false;
                                           
                                           Array.forEach(remarkEditor._defaultToolbar.buttons, function(item)
                                           {
                                               if(item.group == 'insertitem')
                                               {
                                                   item.buttons.pop();
                                               }
                                               if(item.group == 'textstyle')
                                               {
                                                    item.buttons.pop();
                                                    item.buttons.pop();
                                               }
                                               if(item.group == 'fontstyle')
                                               {
                                                    item.buttons.pop();
                                                    item.buttons.pop();
                                               }
                                           });
                                           
                                           remarkEditor.render();
                                     
                                       });
                                       
                                       YAHOO.util.Event.on("submitButton", "click", function(evt)
                                       {
                                           try
                                           {
                                              if( '' == document.getElementById('discussionTitle').value )
                                              {
                                                  alert("You must supply a Title.");
                                                  YAHOO.util.Event.preventDefault(evt);
                                                  return;
                                              }
                                              if( remarkEditor )
                                              {
                                                  remarkEditor.saveHTML();    
                                              }
                                           }
                                           catch(e)
                                           {
                                               alert(e.message);
                                           }
  
                                       });
</script>
                                    
                                    
                                </div>
                                <input style="float:right; width:8em;" type="submit" id="submitButton" value="Save" />
                                <br style="clear:both;" />
                            </form>
                        </div>
                    </div>
                </div>
                </div>
            </body>
        </html>
    </xsl:template>
</xsl:stylesheet>
