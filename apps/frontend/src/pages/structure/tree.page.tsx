import React from 'react';
import { Tree, TreeNode } from 'react-organizational-chart';
import TreeCard from '../../components/TreeCard/TreeCard';

const peoples = {
  id: 1,
  name: 'ivan',
  post: 'ceo',
  children: [
    {
      name: 'arut',
      post: 'ceo',
      children: [
        {
          name: 'ara',
          post: 'ceo',
        }
      ]
    },
    {
      name: 'nikitja',
      post: 'ceo',
      children: [
        {
          name: 'ara',
          post: 'ceo',
        }
      ]
    },
    {
      name: 'vlad',
      post: 'ceo',
      children: [
        {
          name: 'ara',
          post: 'ceo',
        }
      ]
    }
  ]
}


export default function TreePage() {

  return (
    <div>
      <Tree label={<TreeCard name={peoples.name} post={peoples.post} />}>
        {peoples.children.map((people, index) => (
          <TreeNode label={<TreeCard name={people.name} post={people.post} />} >
            {people.children.map((p, index) => (
              <TreeNode label={<TreeCard name={p.name} post={p.post} />}></TreeNode>
            ))}
          </TreeNode>
        ))}
      </Tree>
    </div >
  );
}
