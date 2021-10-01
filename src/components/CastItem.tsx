import React, { useContext, useEffect } from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { Avatar } from 'react-native-elements'
import { Cast } from '../interfaces/movieDetailDB'

interface Props {
  actor: Cast,
}

export const CastItem = ({actor}:Props) => {

  const uriPath = `https://image.tmdb.org/t/p/w500${actor.profile_path}`;
  
  return (
    <View style={{...styles.container}}>
      {
        (actor.profile_path) ? 
        <Avatar
          rounded
          size={50}
          source={{
          uri:
            uriPath,
          }}
        />
        : <Avatar rounded title="N/A" /> 
      }
      <View style={{paddingLeft: 10}}>
        <Text style={{fontWeight: 'bold', fontSize: 15}}>{actor.original_name}</Text>
        <Text style={{fontWeight: 'bold', fontSize: 15}}>{'como ' + actor.character}</Text>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 50,
    shadowColor: 'gray',
    overflow: 'hidden',
    shadowOffset: {
      width: 0,
      height: 15,
    },
    shadowOpacity: 0.5,
    shadowRadius: 10,
    elevation: 5,
    paddingRight: 10,
    paddingLeft: 5,
    marginRight: 10,
    marginTop: 5,
    paddingVertical: 5,
  }
});

