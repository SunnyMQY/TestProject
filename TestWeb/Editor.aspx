<%@ Page Language="C#" AutoEventWireup="true" CodeFile="Editor.aspx.cs" Inherits="Editor" %>

<!DOCTYPE html>

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
<meta http-equiv="Content-Type" content="text/html; charset=utf-8"/>
    <title></title>
    <link rel="stylesheet" href="editor/themes/default/default.css" />
	<script charset="utf-8" src="editor/kindeditor-min.js"></script>
	<script charset="utf-8" src="editor/lang/zh_CN.js"></script>
	<script>
	    KindEditor.ready(function (K) {
	        var editor1 = K.create('#content1', {
	            uploadJson: 'editor/upload.ashx',
	            allowFlashUpload: false,
	            allowMediaUpload: false,
	            allowFileUpload:false,
	            afterCreate: function () {
	                var self = this;
	                K.ctrl(document, 13, function () {
	                    self.sync();
	                    K('form[name=example]')[0].submit();
	                });
	                K.ctrl(self.edit.doc, 13, function () {
	                    self.sync();
	                    K('form[name=example]')[0].submit();
	                });
	            }
	        });
	    });
	</script>
</head>
<body>
    <form id="form1" runat="server">
    <div>
    <textarea id="content1" cols="100" rows="8" style="width:700px;height:200px;visibility:hidden;" runat="server"></textarea>
    </div>
    </form>
</body>
</html>
