package es.peenyaa7.weigraph.model;

import java.time.LocalDate;
import java.util.UUID;

import org.hibernate.annotations.UuidGenerator;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
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
@Table(name = "weight_entries", uniqueConstraints = @UniqueConstraint(columnNames = {"user_id", "date"}))
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class WeightEntry {
    
    @Id
    @Column(name = "id", columnDefinition = "TEXT")
    @UuidGenerator(style = UuidGenerator.Style.AUTO)
    private UUID id;

    @ManyToOne(optional = false)
    @JoinColumn(name = "user_id")
    private User user;

    @Column(nullable = false)
    private LocalDate date;

    @Column(name = "weight_kg", nullable = false)
    private Double weight;

}
