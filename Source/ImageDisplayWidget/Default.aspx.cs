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
    public static int progress = 0;
    public static jSonResponse _jSonResponse=null;

    protected void Page_Load(object sender, EventArgs e)
    {

    }

    [WebMethod]
    public static jSonResponse getProgress()
    {
        progress++;
        if (progress >= 100)
            progress = 0;

        if(_jSonResponse == null)
            _jSonResponse = new jSonResponse();

        _jSonResponse.percentComplete = progress;
        _jSonResponse.messages = new List<message>() {
            new message(){cssClass="alert-info", text= "It is your custom text from server. "+ Guid.NewGuid().ToString() +" :)"},
            new message(){cssClass="alert-danger", text= "****************. "+ Guid.NewGuid().ToString() +" :)"}
        };

        return _jSonResponse;
    }


    [WebMethod]
    public static jSonResponse getFiles()
    {
        progress++;
        if (progress >= 100)
            progress = 0;

        if (_jSonResponse == null)
            _jSonResponse = new jSonResponse();

        _jSonResponse.percentComplete = progress;
        _jSonResponse.messages = new List<message>() {
            new message(){cssClass="alert-info", text= "It is your custom text from server. "+ Guid.NewGuid().ToString() +" :)"},
            new message(){cssClass="alert-danger", text= "****************. "+ Guid.NewGuid().ToString() +" :)"}
        };

        return _jSonResponse;
    }


    [WebMethod]
    public static bool jsSaveFile(string fileContent)
    {
        Thread.Sleep(1000);
        return true;
    }

    [WebMethod]
    public static bool cssSaveFile(string fileContent)
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

public class jSonResponse
{
    public int percentComplete { get; set; }
    public List<message> messages { get; set; }
}

public class message
{
    public string cssClass { get; set; }
    public string text { get; set; }
}