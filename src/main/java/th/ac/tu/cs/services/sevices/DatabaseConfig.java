package th.ac.tu.cs.services.sevices;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.jdbc.datasource.DriverManagerDataSource;

import javax.sql.DataSource;

@Configuration
public class DatabaseConfig {

    @Bean
    public DataSource dataSource() {
        DriverManagerDataSource dataSource = new DriverManagerDataSource();
        dataSource.setDriverClassName("com.mysql.cj.jdbc.Driver");  // Replace with your database driver
        dataSource.setUrl("jdbc:mysql://localhost:3306/hot2hot");  // Replace with your database URL
        dataSource.setUsername("root");  // Replace with your database username
        dataSource.setPassword("");  // Replace with your database password
        return dataSource;
    }
}
