<?xml version="1.0"?>
<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform" xmlns="http://www.w3.org/1999/xhtml">
  <xsl:param name="discussionId" />
  <xsl:output method="html" omit-xml-declaration="yes" indent="yes" />
  <xsl:template name="discussion-controller" match="/">
    <html>
      <head>
        <link href="css/bootstrap.min.css" rel="stylesheet" />


        <style>
          ol {
          counter-reset:li; /* Initiate a counter */
          margin-left:0; /* Remove the default left margin */
          padding-left:0; /* Remove the default left padding */
          }

          ol > li {
          position:relative; /* Create a positioning context */
          margin:0 0 6px 2em; /* Give each list item a left margin to make room for the numbers */
          padding:4px 8px; /* Add some spacing around the content */
          list-style:none; /* Disable the normal item numbering */
          border-top:1px solid #337AB7;
          /*background:#f6f6f6;*/
          }

          ol > li:before {
          content:counter(li); /* Use the counter as content */
          counter-increment:li; /* Increment the counter by 1 */
          /* Position and style the number */
          position:absolute;
          top:-2px;
          left:-2em;
          -moz-box-sizing:border-box;
          -webkit-box-sizing:border-box;
          box-sizing:border-box;
          width:2em;
          margin-right:8px;
          padding:4px;
          border-top:2px solid #337AB7;
          color:#fff;
          background:#337AB7;
          font-weight:bold;
          font-family:"Helvetica Neue", Arial, sans-serif;
          text-align:center;
          border-radius:20px;
          margin-top:25px;
          }
          li ol,
          li ul {margin-top:6px;}
          ol ol li:last-child {margin-bottom:0;}
        </style>

      </head>
      <body>

        <div id="discussion-list">
          <xsl:for-each select="/env/sql/row[col[@meta='HIERARCHY.LEVEL']=1]">
            <xsl:call-template name="ProcessDiscussionThread">
              <xsl:with-param name="top-row" select="." />
              <xsl:with-param name="discussion-id" select="col[@meta='DISCUSSION.DISCUSSION_ID']" />
              <xsl:with-param name="parent-id" select="col[@meta='DISCUSSION.PARENT_DISCUSSION_ID']" />
              <xsl:with-param name="top-id" select="col[@meta='DISCUSSION.DISCUSSION_ID']" />
            </xsl:call-template>
          </xsl:for-each>
        </div>


        <script src="https://ajax.googleapis.com/ajax/libs/jquery/1.11.3/jquery.min.js"></script>

        <script type="text/javascript">
          //<xsl:comment>
            <![CDATA[
            
            
         function openReplyForm(btn)
          {
          var divReplyForm=$(btn).prev();
          console.log(divReplyForm);
          
          $(divReplyForm).find("#replyFrame").attr("src", 'AddDiscussion.html');
          $(divReplyForm).slideToggle( "slow", function() {
            
            if($(divReplyForm).is(':visible'))
            {
              $(btn).val('Close');
              $(btn).removeClass('btn-primary');
              $(btn).addClass('btn-danger');
              $('html,body').animate({ scrollTop: $(btn).offset().top - ( $(window).height() - $(btn).outerHeight(true) ) / 2  }, 500);
            }
            else
            {
              $(btn).val('Reply');
              $(btn).removeClass('btn-danger');
              $(btn).addClass('btn-primary');
            }
            
          });
          
          //alert($(btn));
          }
    //]]>
          </xsl:comment>
        </script>

      </body>
    </html>

  </xsl:template>
  <xsl:template name="ProcessDiscussionThread">
    <xsl:param name="discussion-id" select="-1" />
    <xsl:param name="parent-id" select="-1" />
    <xsl:param name="top-row" />
    <xsl:param name="top-id"  />
    <ol>
      <xsl:for-each select="/env/sql/row[col[@meta='DISCUSSION.PARENT_DISCUSSION_ID']=$parent-id]">
        <xsl:variable name="disc-id" select="col[@meta='DISCUSSION.DISCUSSION_ID']" />
        <xsl:variable name="usr" select="col[@meta='EE_USER.LABEL']" />
        <xsl:variable name="usr-proxy-id" select="col[@meta='EE_USER.ELEMENT_ID']" />
        <xsl:variable name="level" select="col[@meta='HIERARCHY.LEVEL']" />
        <xsl:variable name="remark-txt" select="col[@meta='DISCUSSION.REMARK']" />
        <xsl:if test="($level != 1) or ($disc-id = $discussion-id)">
          <li>
            <xsl:choose>
              <xsl:when test="$level = 1">
                <h3 class="dsTitle">
                  <a href="../request/discussion?pid={$disc-id}&amp;v=form&amp;topId={$top-id}" title="Click to Reply"
                     onclick="return discussionReply({$disc-id},true,{$top-id});" >
                    <xsl:value-of select="col[@meta='DISCUSSION.TITLE']" />
                  </a>
                </h3>
                <xsl:call-template name="discussionBody">

                </xsl:call-template>
              </xsl:when>
              <xsl:otherwise>
                <div style="margin-left:{$level}em;">
                  <h4 class="dsTitle">
                    <a href="../request/discussion?pid={$disc-id}&amp;v=form&amp;topId={$top-id}" title="Click to Reply"
                       onclick="return discussionReply({$disc-id},true,{$top-id});">
                      <xsl:value-of select="col[@meta='DISCUSSION.TITLE']" />
                    </a>
                  </h4>
                  <xsl:call-template name="discussionBody">

                  </xsl:call-template>
                </div>
              </xsl:otherwise>
            </xsl:choose>
            <xsl:if test="count(/env/sql/row[col[@meta='DISCUSSION.PARENT_DISCUSSION_ID']=$disc-id])>0">
              <xsl:call-template name="ProcessDiscussionThread">
                <xsl:with-param name="discussion-id" select="$disc-id" />
                <xsl:with-param name="parent-id" select="$disc-id" />
                <xsl:with-param name="top-id" select="$top-id" />
              </xsl:call-template>
            </xsl:if>
          </li>
        </xsl:if>
      </xsl:for-each>
    </ol>
  </xsl:template>
  <xsl:template name="discussionBody">
    <xsl:variable name="usr" select="col[@meta='EE_USER.LABEL']" />
    <xsl:variable name="usr-proxy-id" select="col[@meta='EE_USER.ELEMENT_ID']" />
    <xsl:variable name="disc-id" select="col[@meta='DISCUSSION.DISCUSSION_ID']" />

    <xsl:choose>
      <xsl:when test="$discussionId = $disc-id">
        <cite class="dsName-selected">
          [ <xsl:value-of select="col[@meta='DISCUSSION.POST_TM']" />  ] -
          <xsl:value-of select="$usr" />

          <span id="ds-{$disc-id}"></span>
        </cite>
      </xsl:when>
      <xsl:otherwise>
        <cite class="dsName">
          [ <xsl:value-of select="col[@meta='DISCUSSION.POST_TM']" />  ] -
          <xsl:value-of select="$usr" />

          <span id="ds-{$disc-id}"></span>
        </cite>
      </xsl:otherwise>
    </xsl:choose>

    <blockquote class="dsRemark">
      <xsl:value-of disable-output-escaping="yes" select="col[@meta='DISCUSSION.REMARK']" />
    </blockquote>
    <div class="divReplyForm" style="display:none;width:80%">
      <iframe src="" frameborder="0" id="replyFrame" name="replyFrame" style="width:100%; height:350px;"></iframe>
    </div>
    <input type="button" class="btn btn-primary btn-sm" style="margin-left:20px;" value="Reply" onclick="openReplyForm(this);"/>
  </xsl:template>
</xsl:stylesheet>