package com.vishal;

import java.io.IOException;
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.xml.ws.Response;

import com.mysql.cj.xdevapi.Statement;

@WebServlet("/Signup")
public class Signup extends HttpServlet{
	 protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		 String fname=request.getParameter("fname");
		 String lname=request.getParameter("lname");
		 String number=request.getParameter("number");
		 String country=request.getParameter("country");
		 String userid =request.getParameter("userid");
		 String password=request.getParameter("password");
		 String mail=request.getParameter("mail");
		 
		 try {
			 Class.forName("com.mysql.jdbc.Driver");
			 Connection con=DriverManager.getConnection("jdbc:mysql://localhost:3306/project","root","root");
			 PreparedStatement st=con.prepareStatement("insert into stack values(?,?,?,?,?,?,?)");
			 
			 
			 st.setString(1,fname);  
			 st.setString(2,lname);  
			 st.setString(3,number);  
			 st.setString(4,country);  
			 st.setString(5,userid);  
			 st.setString(6,password);  
			 st.setString(7,mail);
			 
			 int i=st.executeUpdate();
			 if(i>0)
			 
			 
			 
			 
			// int i=st.executeUpdate("insert into stack(fname,lname,number,country,userid,password,mail)values('"+fname+"','"+lname+"','"+number+"','"+country+"','"+userid+"','"+password+"','"+mail+"')");
			 response.sendRedirect("Sucesssignup.jsp");
		 }
		 catch(Exception e)
		 {
		 	System.out.print(e);
		 	e.printStackTrace();
		 }

}
}