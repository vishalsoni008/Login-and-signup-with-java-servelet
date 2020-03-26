package com.vishal;

import java.io.IOException;
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

@WebServlet("/forgotpass")
public class forgortpass extends HttpServlet{
	protected void doPost(HttpServletRequest request,HttpServletResponse response) throws ServletException, IOException{
		String mail=request.getParameter("mail");
		
		try {  
			Class.forName("com.mysql.jdbc.Driver");
			Connection c=DriverManager.getConnection("jdbc:mysql://localhost:3306/project","root","root");
			PreparedStatement ps=c.prepareStatement("select Mail from stack where Mail=? ");
			ps.setString(1,mail);
			
			ResultSet rs=ps.executeQuery();
			if(rs.next()) {
				response.sendRedirect("update.html");
				return;
			}
			else {
				response.sendRedirect("notreg.html");
			}
		}
		catch(ClassNotFoundException | SQLException e) {
			e.printStackTrace();
		}
	}

}
