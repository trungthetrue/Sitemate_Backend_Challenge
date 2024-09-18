const express = require('express');
const cors = require('cors');
const app = express();
const PORT = 3001;

app.use(express.json());
app.use(cors());

let issues = [
    { id: 1, title: "Issue 1", description: "Description for issue 1" },
    { id: 2, title: "Issue 2", description: "Description for issue 2" },
];

// Read - Get all issues
app.get('/issues', (req, res) => {
    res.json(issues);
});

// Create - Add a new issue
app.post('/issues', (req, res) => {
    const newIssue = req.body;

    // Check if the issue ID already exists
    const issueExists = issues.some(issue => issue.id == newIssue.id);

    if (issueExists) {
        // Send an error response if the ID already exists
        res.status(409).json({ error: "Issue ID already exists." });
    } else {
        // If the ID doesn't exist, create the new issue
        issues.push(newIssue);
        console.log("Created:", newIssue);
        res.status(201).json(newIssue);
    }
});

// Update - Modify an issue
app.put('/issues/:id', (req, res) => {
    const issueId = parseInt(req.params.id);
    const updatedIssue = req.body;
    let issueIndex = issues.findIndex(issue => issue.id == issueId);
    
    if (issueIndex !== -1) {
        issues[issueIndex] = { ...issues[issueIndex], ...updatedIssue };
        console.log("Updated:", updatedIssue);
        res.json(issues[issueIndex]);
    } else {
        res.status(404).send('Issue not found');
    }
});

// Delete - Remove an issue
app.delete('/issues/:id', (req, res) => {
    const issueId = parseInt(req.params.id);
    const issueIndex = issues.findIndex(issue => issue.id == issueId);
    
    if (issueIndex !== -1) {
        const deletedIssue = issues.splice(issueIndex, 1);
        console.log("Deleted:", deletedIssue);
        res.json(deletedIssue);
    } else {
        res.status(404).send('Issue not found');
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
