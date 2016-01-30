<%@ Control Language="C#" AutoEventWireup="true" %>
<div class="details">
    <div class="tab">
        <span>餐台信息</span>
        <hr />
    </div>
    <table>
        <tr>
            <td class="td-title">餐台类型：</td>
            <td class="td-content">
                <select>
                    <option>大厅</option>
                </select>
            </td>
            <td class="td-title">餐台就餐人数：</td>
            <td class="td-content">
                <input type="text" />
            </td>
            <td class="td-title">服务生：</td>
            <td class="td-content">
                <select>
                    <option></option>
                </select>
            </td>
        </tr>
        <tr>
            <td class="td-title">餐台号：</td>
            <td class="td-content">
                <input type="text" />
            </td>
            <td class="td-title">最少就餐人数：</td>
            <td class="td-content">
                <input type="text" />
            </td>
            <td class="td-title">所在区域：</td>
            <td class="td-content">
                <select>
                    <option></option>
                </select>
            </td>
        </tr>
        <tr>
            <td class="td-title">餐台名称：</td>
            <td class="td-content">
                <select>
                    <option>大厅</option>
                </select>
            </td>
            <td class="td-title">餐最多餐人数：</td>
            <td class="td-content">
                <input type="text" />
            </td>
            <td class="td-title">最低消费：</td>
            <td class="td-content">
                <select>
                    <option></option>
                </select>
            </td>
        </tr>
        <tr>
            <td colspan="6">
                <label>
                    <input id="is-can-order" type="checkbox" /><span class="is-can-order-title">是否可预定</span>
                </label>
            </td>
        </tr>
    </table>
    <div class="form-operations">
        <input type="button" value="保存" />
        <input type="button" value="取消" />
    </div>
    <div class="clear"></div>
</div>

