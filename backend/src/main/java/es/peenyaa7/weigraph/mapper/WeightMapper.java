package es.peenyaa7.weigraph.mapper;

import org.mapstruct.Mapper;
import org.mapstruct.factory.Mappers;

import es.peenyaa7.weigraph.dto.WeightEntryRequest;
import es.peenyaa7.weigraph.dto.WeightEntryResponse;
import es.peenyaa7.weigraph.model.WeightEntry;

@Mapper(componentModel = "spring")
public interface WeightMapper {
    
    WeightMapper INSTANCE = Mappers.getMapper(WeightMapper.class);

    WeightEntryResponse weightToWeightEntryResponse(WeightEntry weightEntry);
    WeightEntry weightEntryRequestToWeightEntry(WeightEntryRequest weightEntryRequest);

}
