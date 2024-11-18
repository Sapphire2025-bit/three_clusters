import React from 'react'
import ClusterInfo, {ClusterInfoProps} from './ClusterInfo'
import CardActions from './CardActions'
import CardActionsProps from '../types/cardActionProps';

interface CardProps {
  clusterInfo: ClusterInfoProps; // Props for ClusterInfo component
  allButtons: CardActionsProps; // Props for CardActions component
}

const Card: React.FC<CardProps> = ({ clusterInfo, allButtons }) => {
  return (
    <div className="">
      <ClusterInfo {...clusterInfo} />
      <CardActions {...allButtons} />
    </div>
  )
}

export default Card