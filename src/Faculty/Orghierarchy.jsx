import React from 'react'
import { Tree, TreeNode } from 'react-organizational-chart';
import styled from 'styled-components';
import HirearchyNested from './HirearchyNested';

const StyledNode = styled.div` padding: 2px; border-radius: 5px;display: inline-block; border: 1px solid blue;`;
const Orghierarchy = () => {
  return (
  <div>
  <Tree
    lineWidth={'2px'}
    lineColor={'green'}
    lineBorderRadius={'10px'}
    label={<StyledNode>
      <img src='https://avinya.care4edu.com/static/media/smart.9fb33faacf7e761b0870.png' height={80} width={80} alt=''/>
      <p>Care4edu</p>
      </StyledNode>}
  >
    <TreeNode label={<HirearchyNested supervisorEmail={"care4edu.com"}/>}>
    </TreeNode>
  </Tree>
  </div>
  )
}

export default Orghierarchy;
