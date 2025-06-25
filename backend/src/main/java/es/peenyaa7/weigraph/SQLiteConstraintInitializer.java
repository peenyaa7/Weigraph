package es.peenyaa7.weigraph;

import java.sql.Connection;
import java.sql.Statement;

import javax.sql.DataSource;

import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

@Component
public class SQLiteConstraintInitializer implements CommandLineRunner {
    private final DataSource dataSource;

    public SQLiteConstraintInitializer(DataSource dataSource) {
        this.dataSource = dataSource;
    }

    @Override
    public void run(String... args) throws Exception {
        try (Connection conn = dataSource.getConnection();
            Statement stmt = conn.createStatement()) {
            stmt.execute("CREATE UNIQUE INDEX IF NOT EXISTS idx_unique_date_user ON weight_entries(date, user_id);");
        }
    }
}