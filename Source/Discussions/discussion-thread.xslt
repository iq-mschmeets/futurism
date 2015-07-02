<?xml version="1.0"?>
<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform" xmlns="http://www.w3.org/1999/xhtml">
  <xsl:param name="discussionId" />
  <xsl:output method="xml" omit-xml-declaration="yes" indent="yes" />
  <xsl:template name="discussion-controller" match="/">
    <html>
      <head>
          <link href="css/bootstrap.min.css" rel="stylesheet" />
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

  </xsl:template>
</xsl:stylesheet>