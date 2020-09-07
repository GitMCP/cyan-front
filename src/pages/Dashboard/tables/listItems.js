import React from 'react';
import { Icon } from '@material-ui/core';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import MillIcon from '../assets/mill.svg';
import HarvestIcon from '../assets/wheat.svg';
import FarmIcon from '../assets/barn.svg';
import FieldIcon from '../assets/agriculture.svg';

const mainListItems = props => (
  <div>
    <ListItem button id="mill" onClick={props.onClick}>
      <ListItemIcon>
        <Icon>
          <img alt="Mill Icon" src={MillIcon} height={25} width={25} />
        </Icon>
      </ListItemIcon>
      <ListItemText primary="Mills" />
    </ListItem>
    <ListItem button id="harvest" onClick={props.onClick}>
      <ListItemIcon>
        <Icon>
          <img alt="Harvest Icon" src={HarvestIcon} height={25} width={25} />
        </Icon>
      </ListItemIcon>
      <ListItemText primary="Harvests" />
    </ListItem>
    <ListItem button id="farm" onClick={props.onClick}>
      <ListItemIcon>
        <Icon>
          <img alt="Farm Icon" src={FarmIcon} height={25} width={25} />
        </Icon>
      </ListItemIcon>
      <ListItemText primary="Farms" />
    </ListItem>
    <ListItem button id="field" onClick={props.onClick}>
      <ListItemIcon>
        <Icon>
          <img alt="Field Icon" src={FieldIcon} height={25} width={25} />
        </Icon>
      </ListItemIcon>
      <ListItemText primary="Fields" />
    </ListItem>
  </div>
);

export default mainListItems;
