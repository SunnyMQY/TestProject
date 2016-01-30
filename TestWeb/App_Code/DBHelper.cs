using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using Microsoft.Practices.EnterpriseLibrary.Data;
using Microsoft.Practices.EnterpriseLibrary.Common.Configuration;
using System.Data.Common;
using System.Data;
using System.Data.SqlClient;
using System.Configuration;
using System.Reflection;

/// <summary>
/// DBHelper 的摘要说明
/// 数据库访问工具类
/// </summary>
public class DBHelper
{
    #region 创建Database对象
    /// <summary>
    /// 创建Database对象
    /// </summary>
    /// <param name="dbName">Database对象名称</param>
    /// <returns>Database对象</returns>
    public static Database CreateDB(string dbName = null)
    {
        if (string.IsNullOrEmpty(dbName)) dbName = "TestDB";
        return EnterpriseLibraryContainer.Current.GetInstance<Database>(dbName);
        //return DatabaseFactory.CreateDatabase();
    }
    #endregion 创建Database对象

    #region ExecuteNonQuery
    /// <summary>
    /// 执行一条无返回值的存储过程或Sql语句
    /// </summary>
    /// <param name="db">要操作的数据库</param>
    /// <param name="sqlText">sql文本</param>
    /// <param name="cmdType">sql文本类型</param>
    /// <param name="parameters">参数列表</param>
    /// <returns>返回执行存储过程或Sql语句所影响的行数</returns>
    public static int ExecuteNonQuery(Database db, string sqlText, CommandType cmdType, List<DBParameter> parameters = null)
    {
        int execCount = 0;
        using (DbCommand cmd = CreateDbCommand(db, cmdType, sqlText))
        {
            InitDBCommandParameters(db, parameters, cmd);
            execCount = db.ExecuteNonQuery(cmd);
            UpdateOutputParameter(parameters, cmd);
        }
        return execCount;
    }
    /// <summary>
    /// 在默认数据库上执行一条无返回值的存储过程或Sql语句
    /// </summary>
    /// <param name="sqlText">sql文本</param>
    /// <param name="cmdType">sql文本类型</param>
    /// <param name="parameters">参数列表</param>
    /// <returns>返回执行存储过程或Sql语句所影响的行数</returns>
    public static int ExecuteNonQuery(string sqlText, List<DBParameter> parameters, CommandType cmdType = CommandType.StoredProcedure)
    {
        return ExecuteNonQuery(CreateDB(), sqlText, cmdType, parameters);
    }
    /// <summary>
    /// 在默认数据库上执行一条无返回值的存储过程或Sql语句
    /// </summary>
    /// <param name="sqlText">sql文本</param>
    /// <param name="cmdType">sql文本类型</param>
    /// <param name="parameters">参数列表</param>
    /// <returns>返回执行存储过程或Sql语句所影响的行数</returns>
    public static int ExecuteNonQuery(string sqlText, CommandType cmdType = CommandType.StoredProcedure, List<DBParameter> parameters = null)
    {
        return ExecuteNonQuery(CreateDB(), sqlText, cmdType, parameters);
    }
    #endregion ExecuteNonQuery

    #region ExecuteScalar
    /// <summary>
    /// 执行一条返回单个值的存储过程或Sql语句
    /// </summary>
    /// <param name="db">要操作的数据库</param>
    /// <param name="sqlText">sql文本</param>
    /// <param name="cmdType">sql文本类型</param>
    /// <param name="parameters">参数列表</param>
    /// <returns>返回执行存储过程或Sql语句的单个查询值</returns>
    public static object ExecuteScalar(Database db, string sqlText, CommandType cmdType, List<DBParameter> parameters = null)
    {
        object obj = 0;
        using (DbCommand cmd = CreateDbCommand(db, cmdType, sqlText))
        {
            InitDBCommandParameters(db, parameters, cmd);
            obj = db.ExecuteScalar(cmd);
            UpdateOutputParameter(parameters, cmd);
        }
        return obj;
    }
    /// <summary>
    /// 在默认数据库上执行一条返回单个值的存储过程或Sql语句
    /// </summary>
    /// <param name="sqlText">sql文本</param>
    /// <param name="cmdType">sql文本类型</param>
    /// <param name="parameters">参数列表</param>
    /// <returns>返回执行存储过程或Sql语句的单个查询值</returns>
    public static object ExecuteScalar(string sqlText, List<DBParameter> parameters, CommandType cmdType = CommandType.StoredProcedure)
    {
        return ExecuteScalar(CreateDB(), sqlText, cmdType, parameters);
    }
    /// <summary>
    /// 在默认数据库上执行一条返回单个值的存储过程或Sql语句
    /// </summary>
    /// <param name="sqlText">sql文本</param>
    /// <param name="cmdType">sql文本类型</param>
    /// <param name="parameters">参数列表</param>
    /// <returns>返回执行存储过程或Sql语句的单个查询值</returns>
    public static object ExecuteScalar(string sqlText, CommandType cmdType = CommandType.StoredProcedure, List<DBParameter> parameters = null)
    {
        return ExecuteScalar(CreateDB(), sqlText, cmdType, parameters);
    }
    #endregion ExecuteScalar

    #region ExecuteReader
    /// <summary>
    /// 执行一条返回单个值的存储过程或Sql语句
    /// 赞不支持输出参数
    /// </summary>
    /// <param name="db">要操作的数据库</param>
    /// <param name="sqlText">sql文本</param>
    /// <param name="cmdType">sql文本类型</param>
    /// <param name="parameters">参数列表</param>
    /// <returns>返回执行存储过程或Sql语句的单个查询值</returns>
    public static IDataReader ExecuteReader(Database db, string sqlText, CommandType cmdType, List<DBParameter> parameters = null)
    {
        IDataReader reader;
        using (DbCommand cmd = CreateDbCommand(db, cmdType, sqlText))
        {
            InitDBCommandParameters(db, parameters, cmd);
            reader = db.ExecuteReader(cmd);
        }
        return reader;
    }
    /// <summary>
    /// 在默认数据库上执行一条返回单个值的存储过程或Sql语句
    /// </summary>
    /// <param name="sqlText">sql文本</param>
    /// <param name="cmdType">sql文本类型</param>
    /// <param name="parameters">参数列表</param>
    /// <returns>返回执行存储过程或Sql语句的单个查询值</returns>
    public static IDataReader ExecuteReader(string sqlText, List<DBParameter> parameters, CommandType cmdType = CommandType.StoredProcedure)
    {
        return ExecuteReader(CreateDB(), sqlText, cmdType, parameters);
    }
    /// <summary>
    /// 在默认数据库上执行一条返回单个值的存储过程或Sql语句
    /// </summary>
    /// <param name="sqlText">sql文本</param>
    /// <param name="cmdType">sql文本类型</param>
    /// <param name="parameters">参数列表</param>
    /// <returns>返回执行存储过程或Sql语句的单个查询值</returns>
    public static IDataReader ExecuteReader(string sqlText, CommandType cmdType = CommandType.StoredProcedure, List<DBParameter> parameters = null)
    {
        return ExecuteReader(CreateDB(), sqlText, cmdType, parameters);
    }
    #endregion ExecuteReader

    #region ExecuteDataSet
    /// <summary>
    /// 执行一条返回单个值的存储过程或Sql语句
    /// </summary>
    /// <param name="db">要操作的数据库</param>
    /// <param name="sqlText">sql文本</param>
    /// <param name="cmdType">sql文本类型</param>
    /// <param name="parameters">参数列表</param>
    /// <returns>返回执行存储过程或Sql语句的单个查询值</returns>
    public static DataSet ExecuteDataSet(Database db, string sqlText, CommandType cmdType, List<DBParameter> parameters = null)
    {
        DataSet ds;
        using (DbCommand cmd = CreateDbCommand(db, cmdType, sqlText))
        {
            InitDBCommandParameters(db, parameters, cmd);
            ds = db.ExecuteDataSet(cmd);
            UpdateOutputParameter(parameters, cmd);
        }
        return ds;
    }
    /// <summary>
    /// 在默认数据库上执行一条返回单个值的存储过程或Sql语句
    /// </summary>
    /// <param name="sqlText">sql文本</param>
    /// <param name="cmdType">sql文本类型</param>
    /// <param name="parameters">参数列表</param>
    /// <returns>返回执行存储过程或Sql语句的单个查询值</returns>
    public static DataSet ExecuteDataSet(string sqlText, List<DBParameter> parameters, CommandType cmdType = CommandType.StoredProcedure)
    {
        return ExecuteDataSet(CreateDB(), sqlText, cmdType, parameters);
    }
    /// <summary>
    /// 在默认数据库上执行一条返回单个值的存储过程或Sql语句
    /// </summary>
    /// <param name="sqlText">sql文本</param>
    /// <param name="cmdType">sql文本类型</param>
    /// <param name="parameters">参数列表</param>
    /// <returns>返回执行存储过程或Sql语句的单个查询值</returns>
    public static DataSet ExecuteDataSet(string sqlText, CommandType cmdType = CommandType.StoredProcedure, List<DBParameter> parameters = null)
    {
        return ExecuteDataSet(CreateDB(), sqlText, cmdType, parameters);
    }
    #endregion ExecuteDataSet

    #region 实体转换工具
    /// <summary>
    /// 将IDataReader对象转换成实体对象
    /// </summary>
    /// <typeparam name="T">实体类型</typeparam>
    /// <param name="reader">IDataReader对象</param>
    /// <param name="isNext">判断是否继续读取。
    /// 将IDataReader转换成泛型列表时请置为true；
    /// 将执行的Sql返回一条记录时转换成实体对象时不带参数或置为false,不然reader对象不会关闭。
    /// </param>
    /// <returns>实体对象</returns>
    public static T ConvertToEntity<T>(IDataReader reader, bool isNext = false)
    {
        if (!isNext)
        {
            if (reader.Read())
            {
                T t = ConvertToEntity<T>((type, property) => SetProperty<T>(reader, type, property));
                reader.Close();
                return t;
            }
            reader.Close();
        }
        else
        {
            T t = ConvertToEntity<T>((type, property) => SetProperty<T>(reader, type, property));
            return t;
        }
        return default(T);
    }
    /// <summary>
    /// 将DataRow对象转换成实体对象
    /// </summary>
    /// <typeparam name="T">实体类型</typeparam>
    /// <param name="row">数据行</param>
    /// <returns>实体对象</returns>
    public static T ConvertToEntity<T>(DataRow row)
    {
        T t = ConvertToEntity<T>((type, property) =>
        {
            if (property.CanWrite && row.Table.Columns.Contains(property.Name))
            {
                object value = row[property.Name];
                if (value != null && value != DBNull.Value)
                    property.SetValue(type, value, null);
            }
        });
        return t;
    }
    /// <summary>
    /// 将DataTable列表转换成泛型列表
    /// </summary>
    /// <typeparam name="T">实体类型</typeparam>
    /// <param name="dt">DataTable数据源</param>
    /// <returns>泛型列表</returns>
    public static List<T> ConvertToList<T>(DataTable dt)
    {
        List<T> tList = new List<T>();
        foreach (DataRow row in dt.Rows)
        {
            tList.Add(ConvertToEntity<T>(row));
        }
        return tList;
    }
    /// <summary>
    /// 将IDataReader对象转换成泛型列表
    /// </summary>
    /// <typeparam name="T">实体类型</typeparam>
    /// <param name="reader">IDataReader对象</param>
    /// <returns>泛型列表</returns>
    public static List<T> ConvertToList<T>(IDataReader reader)
    {
        List<T> tList = new List<T>();
        while (reader.Read())
        {
            tList.Add(ConvertToEntity<T>(reader, true));
        }
        reader.Close();
        return tList;
    }
    #endregion 实体转换工具

    #region 私有工具
    /// <summary>
    /// 将IDataReader对象的字段转换成实体属性时的转换操作
    /// </summary>
    /// <typeparam name="T">实体类型</typeparam>
    /// <param name="reader">IDataReader对象</param>
    /// <param name="type">实体对象</param>
    /// <param name="property">实体对象的属性</param>
    static void SetProperty<T>(IDataReader reader, T type, PropertyInfo property)
    {
        if (property.CanWrite && FieldIsExistInReader(reader, property.Name))
        {
            object value = reader[property.Name];
            if (value != null && value != DBNull.Value)
                property.SetValue(type, value, null);
        }
    }
    /// <summary>
    /// 检查Reader对象中是否包含某一字段
    /// </summary>
    /// <param name="reader">IDataReader对象</param>
    /// <param name="fieldName">字段名称</param>
    /// <returns>Reader对象中是否包含要检查的字段</returns>
    static bool FieldIsExistInReader(IDataReader reader, string fieldName)
    {
        bool isHad = false;
        for (int i = 0; i < reader.FieldCount; i++)
        {
            if (reader.GetName(i).ToLower() == fieldName.ToLower())
            {
                isHad = true;
                break;
            }
        }
        return isHad;
    }
    /// <summary>
    /// 转换实体
    /// </summary>
    /// <typeparam name="T">实体类型</typeparam>
    /// <param name="action">实体对象属性设置</param>
    /// <returns>实体对象</returns>
    static T ConvertToEntity<T>(Action<T, PropertyInfo> action)
    {
        Type type = typeof(T);
        T t = (T)type.GetConstructor(new Type[0]).Invoke(new Object[0]);
        PropertyInfo[] propertys = type.GetProperties();
        foreach (var property in propertys)
        {
            action(t, property);
        }
        return t;
    }
    /// <summary>
    /// 创建DbCommand对象
    /// </summary>
    /// <param name="db">要操作的数据库</param>
    /// <param name="commandType">sql文本类型</param>
    /// <param name="sqlText">sql文本</param>
    /// <returns>返回DbCommand对象</returns>
    static DbCommand CreateDbCommand(Database db, CommandType commandType, string sqlText)
    {
        switch (commandType)
        {
            case CommandType.StoredProcedure: return db.GetStoredProcCommand(sqlText);
            default: return db.GetSqlStringCommand(sqlText);
        }
    }
    /// <summary>
    /// 在执行sql语句之前添加sql参数
    /// </summary>
    /// <param name="db">要操作的数据库</param>
    /// <param name="parameters">sql参数列表</param>
    /// <param name="cmd">DbCommand对象</param>
    static void InitDBCommandParameters(Database db, List<DBParameter> parameters, DbCommand cmd)
    {
        if (parameters != null && parameters.Count > 0)
        {
            DbParameter parameter;
            foreach (DBParameter param in parameters)
            {
                parameter = db.DbProviderFactory.CreateParameter();
                parameter.Direction = param.Direction;
                parameter.ParameterName = param.Name;
                parameter.Value = param.Value;
                cmd.Parameters.Add(parameter);
            }
        }
    }
    /// <summary>
    /// 执行存储过程之后更新存储的输出参数值
    /// </summary>
    /// <param name="parameters">参数列表</param>
    /// <param name="cmd">DbCommand对象</param>
    static void UpdateOutputParameter(List<DBParameter> parameters, DbCommand cmd)
    {
        if (cmd.CommandType == System.Data.CommandType.StoredProcedure && parameters != null && parameters.Count > 0 && parameters.Count(parameter => parameter.Direction == ParameterDirection.InputOutput) > 0)
        {
            foreach (var parameter in parameters)
            {
                parameter.Value = cmd.Parameters[parameter.Name];
            }
        }
    }
    #endregion 私有工具
}
/// <summary>
/// 项目所使用的所有数据库
/// </summary>
public class DBCantainer
{
    /// <summary>
    /// 测试数据库
    /// </summary>
    public static Database TestDB { get { return DBHelper.CreateDB(); } }
}
/// <summary>
/// Sql文本类型枚举
/// </summary>
public enum CommandType
{
    /// <summary>
    /// Sql语句
    /// </summary>
    Text,
    /// <summary>
    /// 存储过程
    /// </summary>
    StoredProcedure
}
/// <summary>
/// Sql语句参数类
/// </summary>
public class DBParameter
{
    ParameterDirection direction = ParameterDirection.Input;
    /// <summary>
    /// 参数名称
    /// </summary>
    public string Name { get; set; }
    /// <summary>
    /// 参数值
    /// </summary>
    public object Value { get; set; }
    /// <summary>
    /// 参数输入、输出方向
    /// </summary>
    public ParameterDirection Direction
    {
        get { return direction; }
        set { direction = value; }
    }
}