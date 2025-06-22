package es.peenyaa7.weigraph.mapper;

import org.mapstruct.Mapper;
import org.mapstruct.factory.Mappers;

import es.peenyaa7.weigraph.dto.WeightEntryResponse;
import es.peenyaa7.weigraph.model.WeightEntry;

@Mapper
public interface WeightMapper {
    
    WeightMapper INSTANCE = Mappers.getMapper(WeightMapper.class);

    WeightEntryResponse weightToWeightEntryResponse(WeightEntry weightEntry);

}
