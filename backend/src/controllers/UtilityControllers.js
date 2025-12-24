

export const healthCheck = (req, res) => {
    res.json({
        status: 'ok',
        uptime: process.uptime(),
        timestamp: new Date().toISOString()
    });
};

export const sessionInfo = (req, res) => {
    res.json({
        authenticated: !!req.session.userId,
        session: req.session
    });
};

export const resetSession = (req, res) => {
    req.session.destroy(err => {
        if (err) {
            return res.status(500).json({ error: 'Failed to destroy session' });
        }

        res.clearCookie('connect.sid');
        res.json({ message: 'Session reset successful' });
    });
};