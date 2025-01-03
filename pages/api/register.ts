import bcrypt from 'bcrypt';
import { NextApiRequest, NextApiResponse } from 'next';
import primadb from '@/lib/prismadb';
//import { error } from 'console';

export default async function handler(req: NextApiRequest,res: NextApiResponse) {
   if (req.method !== 'POST') {
    return res.status(405).end();
   }
    try {
        const { email, name, password } = req.body;

        const exitsingUser = await primadb.user.findUnique({
            where: {
                email,

            }
        });

        if (exitsingUser) {
            return res.status(422).json({ error: 'Email taken'});
        }
         
        const hashedPassword = await bcrypt.hash(password, 12);

        const user = await prismadb.user.create({
            data: {
                email, 
                name,
                hashedPassword,
                image: '',
                emailVerified: new Date(),
            }
        });
        } catch (error) {
        console.log(error);
        return res.status(400).end();
    }
    
}