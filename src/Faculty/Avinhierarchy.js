import React from 'react'
import { Tree, TreeNode } from 'react-organizational-chart';
import styled from 'styled-components';
import Avhirearchy from './Avhirearchy';

const StyledNode = styled.div` padding: 2px; border-radius: 5px;display: inline-block; border: 1px solid blue;`;
const Avinhierarchy = () => {
  return (
  <div>
  <Tree
    lineWidth={'2px'}
    lineColor={'green'}
    lineBorderRadius={'10px'}
    label={<StyledNode>
      <img src='https://avinya.care4edu.com/static/media/Image.2b108eb4b322f6621bfb.png' height={80} width={80} alt=''/>
      <p>Avinya</p>
      </StyledNode>}
  >
    <TreeNode label={< Avhirearchy supervisorEmail={"care4edu"}/>}>
    </TreeNode>
  </Tree>
  </div>
  )
}

export default Avinhierarchy;
