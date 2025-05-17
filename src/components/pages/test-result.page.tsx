import { Button, Label } from '@components/atoms';
import { Tabs } from '@components/organisms';
import React from 'react';

const TestResultPage: React.FC = () => {
    const tabs = [
        {
            name: 'questions',
            label: 'QUESTIONS',
            content: (
                <div>
                    <h2 className="text-xl font-semibold">Summary</h2>
                    <p className="text-gray-700 mt-2">You scored 85% on your recent test!</p>
                </div>
            ),
        },
        {
            name: 'candidates',
            label: 'CANDIDATES',
            content: (
                <div>
                    <h2 className="text-xl font-semibold">Details</h2>
                    <p className="text-gray-700 mt-2">Detailed breakdown of your test...</p>
                </div>
            ),
        },
        {
            name: 'expert-advice',
            label: 'EXPERT ADVICE',
            content: (
                <div>
                    <h2 className="text-xl font-semibold">Recommendations</h2>
                    <p className="text-gray-700 mt-2">Suggestions based on your results...</p>
                </div>
            ),
        },
        {
            name: 'download',
            label: 'DOWNLOAD',
            content: (
                <div>
                    <h2 className="text-xl font-semibold">Download</h2>
                    <p className="text-gray-700 mt-2">Download your results as a PDF...</p>
                    <button className="bg-blue-500 text-white px-4 py-2 rounded mt-2">Download PDF</button>
                </div>
            ),
        },
    ];

    return (
        <div className="container mx-auto p-6 mt-12">
            <div className="flex justify-between items-center">
                <Label className="text-2xl font-mono mb-4">Sample Quiz Test</Label>
                <div className='flex gap-4'>
                    <Button varient='bordered' className='border border-purple-600 focus:ring-1 focus:ring-purple-600'>Refresh</Button>
                    <Button varient='bordered' className='border border-purple-600 focus:ring-1 focus:ring-purple-600'>INVITE</Button>
                </div>
            </div>
            <Tabs tabs={tabs} />    
        </div>
    );
};

export default TestResultPage;
