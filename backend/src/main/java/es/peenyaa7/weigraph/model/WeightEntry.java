package es.peenyaa7.weigraph.model;

import java.time.LocalDate;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import jakarta.persistence.UniqueConstraint;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "weight_entries", uniqueConstraints = { @UniqueConstraint(columnNames = {"user_id", "date"}) })
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class WeightEntry {
    
    @Id
    @Column(name = "id")
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    @ManyToOne(optional = false)
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @Column(nullable = false)
    private LocalDate date;

    @Column(name = "weight_kg", nullable = false)
    private Double weight;

    @Override
    public String toString() {
        return "WeightEntry{" +
                "id=" + id +
                ", user=" + (user != null ? user.getUsername() : "null" ) +
                ", date=" + date +
                ", weight=" + weight +
                '}';
    }

}
