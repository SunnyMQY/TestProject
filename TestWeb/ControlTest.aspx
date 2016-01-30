<%@ Page Language="C#" AutoEventWireup="true" %>

<%@ Register Src="~/controls/Details.ascx" TagPrefix="uc" TagName="Details" %>
<%@ Register Src="~/controls/Grid.ascx" TagPrefix="uc" TagName="Grid" %>



<!DOCTYPE html>

<html xmlns="http://www.w3.org/1999/xhtml">
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
    <title></title>
    <style type="text/css">
        body, select, input, table {
            margin: 0;
            padding: 0;
            font-size: 12px;
        }

        .content {
            width: 996px;
            margin: 0 auto;
            border-right: solid 1px #666;
            border-left: solid 1px #666;
            border-bottom: solid 1px #666;
        }

        .header {
            height: 30px;
            text-align: right;
            margin: 0 10px 0 0;
            font-size: 14px;
            line-height: 30px;
            font-weight: normal;
        }

        .operations {
            height: 45px;
            padding: 0 15px;
            border-bottom: solid 1px #666;
            border-top: solid 1px #666;
        }

            .operations input {
                height: 28px;
                padding: 0 10px;
                border: solid 1px #666;
                margin-top: 8px;
            }

        table {
            border-collapse: collapse;
        }

        .data {
            margin: 3px 2px;
            width: 992px;
        }

            .data td {
                border: solid 1px #666;
                text-align: center;
                margin: 0;
            }

            .data thead td {
                padding: 10px 0;
            }

            .data tbody td {
                padding: 10px 0;
            }

        .details {
            margin-top: 50px;
        }

        .tab {
            float: left;
            height: 20px;
            width: 100%;
        }

            .tab span, .tab hr {
                display: inline-block;
            }

            .tab span {
                width: 60px;
                text-align: center;
                float: left;
                line-height: 20px;
            }

            .tab hr {
                width: 930px;
                margin-top: 11px;
                float: left;
            }

        .clear {
            clear: both;
            width: 0;
            height: 0;
            font-size: 1px;
            margin: 0;
            padding: 0;
        }

        .td-title {
            text-align: right;
            width: 90px;
        }

        .details table {
            width: 100%;
        }

        .details td {
            padding: 8px 0;
        }

        .td-content {
            width: 222px;
        }

        .details input, .details select {
            width: 160px;
            height: 24px;
        }

        #is-can-order {
            width: 16px;
            height: 16px;
        }

        .details label {
            margin-left: 30px;
            float: left;
        }

        .is-can-order-title, #is-can-order {
            display: inline-block;
            float: left;
        }

        .is-can-order-title {
            height: 16px;
            line-height: 18px;
        }

        .form-operations {
            margin: 30px;
            padding-left: 330px;
        }

            .form-operations input {
                width: 60px;
                height: 30px;
                margin-left: 50px;
            }
    </style>
    <script src="js/jquery-2.1.4.min.js"></script>
    <script>
        $(function () {
            alert($(".data").html());
        });
    </script>
</head>
<body>
    <div class="content">
        <h5 class="header">xxx花园路店</h5>
        <div class="operations">
            <input type="button" value="新增餐台" />
        </div>
        <uc:Grid runat="server" ID="Grid" />
        <uc:Details runat="server" ID="Details" />
        <%--<!-- #include file="/controls/grid.html" -->
        <!-- #include file="/controls/details.html" -->--%>
    </div>
    <div id="main" style="background: #ffdd00; height: 30px;">
        ddd
    </div>
</body>
</html>

