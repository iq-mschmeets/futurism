<?xml version="1.0"?>
<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform" xmlns="http://www.w3.org/1999/xhtml"
                xmlns:ee="http://enterprise-elements.com/template-tag">
    <xsl:output method="xml" indent="yes" omit-xml-declaration="yes" 
        doctype-system="http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd"
        doctype-public="-//W3C//DTD XHTML 1.0 Transitional//EN" />
    <xsl:include href="discussion-thread.xslt" />
    <xsl:param name="id" />
    <xsl:param name="title" />
    <xsl:param name="href" />
    <xsl:template match="/">
        <xsl:variable name="ref" select="/env/param[@parameter='referer']/@value" />
        <html>
            <head>
                <link rel="stylesheet" href="../css/base.css" type="text/css" />
                <ee:script-include />
                <ee:css-include />
                <script type="text/javascript" src="../script/ee/dataNavigator.js"></script>
                <title>Discussions Related to Resource: <xsl:value-of select="$title" /></title>
                
                
                  
                <style type="text/css">

                    #discussion-list ol {
                        list-style-type: none;
                        padding-left: 1.75em;
                        padding-top:0em;
                        margin-top:0em;
                    }

                    ul{
                         list-style-position: inside;
                          margin-left: 1.5em;
                          list-style-type: disc;
                    }
                    #discussion-list{
                        padding: 0em 1.5em 1em .5em;
                    }
                    h3.dsTitle{
                        margin:1.5em 0 0 0;
                    }
                    h4.dsTitle{
                        margin:1em 0 0 0;
                    }
                    blockquote{
                        margin:.25em 0 .25em 1em;
                    }
                    cite{
                        margin:.25em 0 .25em 1em;
                        font-size:85%;
                     }
                    .dsName{
                        background: #f2f2f2;
                        display:block;
                        padding: .5em ;
                    }
                    .dsName-selected{
                        background: #f4f4da;
                        display: block;
                        padding: .5em;
                    }
                    .dsRemark{
                        padding: .5em;
                        border: 1px solid #e6e6e6;
                    }
                    
                    .discussionSubject{
                        padding: 0 0;
                        margin: .25em auto 0 .25em;
                    }
                    h3{
                        font-size: 130%;
                    }
                    
                </style>

                <script type="text/javascript" xml:space="preserve">
                function discussionReply( disId, useForm, topId )
                {
                
                    var url = DomFactory.buildUrl(["../request/discussion", "pid="+disId, "topId="+topId, "v=form"]);
                    window.open(url,"", "height=600,width=800,menubar=no,toolbar=no,resizable=yes,scrollbars=yes,locationbar=no",false );
                                
                    return false;
                }
                </script>
                
                
                <script type="text/javascript" xml:space="preserve">
   //<![CDATA[
   $(document).ready(function() {
       var list = gecn( 'dsRemark' ); 
       checkListForUrls( list );   
   });
  //]]></script>
            </head>
            <body  class="yui-skin-sam">
              <div id="hd">
                <div id="heading">
                    <ee:nav-bar linkSet="portal">
                        <ee:include name="ElementsUtilityMenu" />
                        <ee:include name="HomeMenu" />
                        <ee:include name="FavoritesMenu" />
                        <ee:include name="LogOffMenu" />
                    </ee:nav-bar>
                 </div>
                 <a href="#content-start" id="content-start" name="content-start" accesskey="2"></a>
                    
                 <h1 id="siteName">Discussions </h1>
                    
              </div>
              <div id="bd">
                <ee:bread-crumbs />
                    <div id="content">
                       <h3 class="discussionSubject">Related to Resource: <a href="{$href}"><xsl:value-of select="$title" /></a></h3>
                       <xsl:call-template name="discussion-controller" />
                    </div>
             </div>
            </body>
        </html>
    </xsl:template>
</xsl:stylesheet>
