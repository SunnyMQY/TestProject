using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using Microsoft.Practices.EnterpriseLibrary.Data;
using Microsoft.Practices.EnterpriseLibrary.Common;
using System.Data;
using System.Data.Common;

public partial class Editor : System.Web.UI.Page
{
    protected void Page_Load(object sender, EventArgs e)
    {
        if (!IsPostBack)
        {
            //Database db = DBHelper.CreateDB();
            //List<APPayment> paymentList = new List<APPayment>();
            //using (DbCommand cmd = db.GetSqlStringCommand("SELECT PaymentCode,CurrencyAmount,ApprovedDate,CreatedDate,[Version],IsVerified FROM finance.APPayment where supplierid=@supplierid;"))
            //{
            //    //using (IDataReader reader = db.ExecuteReader(cmd))
            //    //{
            //    //    while (reader.Read())
            //    //    {
            //    //        paymentList.Add(DBHelper.ConvertToEntity<APPayment>(reader));
            //    //    }
            //    //    reader.Close();
            //    //}
            //    DbParameter dp = db.DbProviderFactory.CreateParameter();
            //    DBParameter parameter = new DBParameter { Name = "SupplierID", Value = 58, Direction = ParameterDirection.InputOutput };
            //    dp.ParameterName = parameter.Name;
            //    dp.Value = parameter.Value;
            //    dp.Direction = parameter.Direction;
            //    cmd.Parameters.Add(dp);

            //    DataSet ds = db.ExecuteDataSet(cmd);
            //    if (ds.Tables.Count > 0)
            //    {
            //        paymentList = DBHelper.ConvertToList<APPayment>(ds.Tables[0]);
            //    }
            //}
            List<APPayment> paymentList = new List<APPayment>();
            DataSet ds = DBHelper.ExecuteDataSet("SELECT PaymentCode,CurrencyAmount,ApprovedDate,CreatedDate,[Version],IsVerified FROM finance.APPayment where supplierid=@supplierid;", CommandType.Text,
                new List<DBParameter> { new DBParameter { Name = "SupplierID", Value = 58, Direction = ParameterDirection.InputOutput } });
            paymentList = DBHelper.ConvertToList<APPayment>(ds.Tables[0]);

            IDataReader reader = DBHelper.ExecuteReader("SELECT PaymentCode,CurrencyAmount,ApprovedDate,CreatedDate,[Version],IsVerified FROM finance.APPayment where supplierid=@supplierid;", CommandType.Text,
                new List<DBParameter> { new DBParameter { Name = "SupplierID", Value = 58, Direction = ParameterDirection.InputOutput } });
            List<APPayment> pList = DBHelper.ConvertToList<APPayment>(reader);

            IDataReader reader1 = DBHelper.ExecuteReader("SELECT top 1 PaymentCode,CurrencyAmount,ApprovedDate,CreatedDate,[Version],IsVerified FROM finance.APPayment where supplierid=@supplierid;", CommandType.Text,
                new List<DBParameter> { new DBParameter { Name = "SupplierID", Value = 58, Direction = ParameterDirection.InputOutput } });
            APPayment pList1 = DBHelper.ConvertToEntity<APPayment>(reader1);

            List<string> list = new List<string> { "aa", "aa-1", "aaa-1", "aaa-2", "bbb-3" };
            list = list.Select(s => s.Substring(0, (s.IndexOf('-') > 0 ? s.IndexOf('-') : s.Length))).Distinct().ToList<string>();

            foreach (var item in list)
            {
                content1.Value += item + "<br/>";
            }
        }
    }

    public class APPayment
    {
        public string PaymentCode { get; set; }
        public decimal CurrencyAmount { get; set; }
        public DateTime ApprovedDate { get; set; }
        public DateTime CreatedDate { get; set; }
        public int Version { get; set; }
        public bool IsVerified { get; set; }
    }
}