import { Card, Space } from 'antd';
import React from 'react';
interface iTreeCard {
    post?: string,
    name?: string
}
export default function TreeCard({ name, post }: iTreeCard): JSX.Element {
    return (
        <Space direction="vertical" size={16}>
            <Card size="small" title={name} style={{ width: 300 }}>
                <p>{post}</p>
            </Card>
        </Space>
    );
}
