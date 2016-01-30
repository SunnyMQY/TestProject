using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;

public partial class StringListSort : System.Web.UI.Page
{
    protected void Page_Load(object sender, EventArgs e)
    {
        if (!IsPostBack)
        {
            GetProjectAidedTypeByIndex("Customer,CashProject,Department,SelfDefine5,SelfDefine1,SelfDefine7,SelfDefine10,SelfDefine2");
        }
    }

    private void GetProjectAidedTypeByIndex(string aidedString)
    {
        string[] aidedTypeList = aidedString.Split(',');
        List<string> list = aidedTypeList.ToList();
        list.Sort((ti, t2) =>
        {
            return (int)(Enum.Parse(typeof(ProjectAidedType), ti, true)) > (int)(Enum.Parse(typeof(ProjectAidedType), t2, true)) ? 1 : -1;
        });
        //for (int i = 0; i < aidedTypeList.Length - 1; i++)
        //{
        //    for (int j = 0; j < aidedTypeList.Length - i - 1; j++)
        //    {
        //        if ((int)(Enum.Parse(typeof(ProjectAidedType), aidedTypeList[j], true)) > (int)(Enum.Parse(typeof(ProjectAidedType), aidedTypeList[j + 1], true)))
        //        {
        //            string temp = aidedTypeList[j];
        //            aidedTypeList[j] = aidedTypeList[j + 1];
        //            aidedTypeList[j + 1] = temp;
        //        }
        //    }
        //}

        foreach (var item in list)
        {
            Response.Write((item + "<br/>"));
        }
    }
}
public enum ProjectAidedType
{
    //部门，个人，客户，供应商，项目，现金，合作伙伴，特许经营商，功能分类，经济分类，1，2，...，10
    Department = 0,
    Personal = 1,
    Customer = 2,
    Supplier = 3,
    Project = 4,
    CashProject = 5,
    PartnerCompany = 6,
    FranchiseCompany = 7,
    SelfDefine1 = 8,
    SelfDefine2 = 9,
    SelfDefine3 = 10,
    SelfDefine4 = 11,
    SelfDefine5 = 12,
    SelfDefine6 = 13,
    SelfDefine7 = 14,
    SelfDefine8 = 15,
    SelfDefine9 = 16,
    SelfDefine10 = 17
}