import React from 'react'
import ClusterInfo, {ClusterInfoProps} from './ClusterInfo'
import CardActions from './CardActions'
import CardActionsProps from '../types/cardActionProps';

interface CardProps {
  clusterInfo: ClusterInfoProps;
  allButtons: CardActionsProps;
}

const Card: React.FC<CardProps> = ({ clusterInfo, allButtons }) => {
  return (
    <div className="rounded-lg m-4 bg-gray-300">
      <ClusterInfo {...clusterInfo} />
      <hr className="my-2 border-t border-gray-400" />
      <CardActions {...allButtons} />
    </div>
  )
}

export default Card