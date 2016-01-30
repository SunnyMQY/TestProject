<%@ WebHandler Language="C#" Class="Upload" %>

using System;
using System.Web;
using System.IO;
using System.Globalization;
using System.Collections;
using System.Text;
public class Upload : IHttpHandler
{
    HttpRequest request = null;
    HttpResponse response = null;
    public void ProcessRequest(HttpContext context)
    {
        request = context.Request;
        response = context.Response;
        try
        {
            Hashtable extTable = new Hashtable();
            if (request.Files.Count > 0)
            {
                string[] validImageExtension = { "image/gif", "image/jpeg", "application/x-jpg", "image/png", "application/x-png", "application/x-bmp" };
                int maxSize = 5 * 1024 * 1024;

                HttpPostedFile file = request.Files[0];
                if (file != null)
                {
                    if (Array.IndexOf(validImageExtension, file.ContentType.ToLower()) >= 0)
                    {
                        Stream stream = file.InputStream;
                        if (stream != null && stream.Length <= maxSize)
                        {
                            byte[] b = new byte[file.ContentLength];
                            stream.Read(b, 0, b.Length);
                            ReturnResult(true, "http://www.baidu.com");
                        }
                        else ReturnResult(false, "文件大小不能超过" + (maxSize / (1024 * 1024)).ToString() + "M！");
                    }
                    else ReturnResult(false, "文件类型只能是gif,jpg,jpeg,png或bmp格式的图片！");
                }
                else ReturnResult(false, "文件不存在，请选择文件！");
            }
        }
        catch(Exception e)
        {
            ReturnResult(false, "上传失败！");
        }
    }

    void ReturnResult(bool isScuuess, string urlOrMsg)
    {
        response.AddHeader("Content-Type", "text/html; charset=UTF-8");
        StringBuilder sbResult = new StringBuilder("{\"error\":");
        sbResult.Append(isScuuess ? "0" : "1")
            .Append(",\"" + (isScuuess ? "url" : "message"))
            .Append("\":\"" + urlOrMsg + "\"}");
        response.Write(sbResult);
    }

    public bool IsReusable
    {
        get
        {
            return false;
        }
    }

}