using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Web;
using System.Web.Services;
using System.Web.UI;
using System.Web.UI.WebControls;

public partial class _Default : System.Web.UI.Page
{

    protected void Page_Load(object sender, EventArgs e)
    {

    }


    [WebMethod]
    public static bool jsSaveFile(string fileContent)
    {
        Thread.Sleep(1000);
        return true;
    }

    [WebMethod]
    public static bool cssSaveFile()
    {
        Thread.Sleep(2000);
        return true;
    }

    [WebMethod]
    public static bool htmlSaveFile(string fileContent)
    {
        Thread.Sleep(3000);
        return true;
    }

}