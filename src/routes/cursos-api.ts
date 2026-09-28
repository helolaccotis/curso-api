import { Router, Response, Request } from "express";
import prisma from "../prismaClient";
 
const router = Router()
 
////////////
 
//lista todos os cursos
router.get("/curso", async (req: Request, res: Response) => {
    try {
        const cursos = await prisma.cursos.findMany();
        return res.status(200).json(cursos)
    } catch (error) {
        console.error('Erro ao buscar cursos:', error);
        return res.status(500).json({ error: 'Erro interno ao buscar cursos' });
    }
})
 
//Busca um curso pelo id
router.get("/curso/:id", async (req: Request, res: Response) => {
    try {
        const id = Number(req.params.id)
        const cursos = await prisma.cursos.findUnique({
            where: { id }
        })
 
        return res.status(200).json(cursos)
    } catch (error) {
        console.error('Erro ao buscar cursos:', error);
        return res.status(500).json({ error: 'Erro interno ao buscar cursos' });
    }
})
 
//Cadastra um novo curso
router.post("/curso", async (req: Request, res: Response) => {
    try {
        const { title, descricao, instrutorId } = req.body
 
        if (!title || !descricao || !instrutorId) {
            return res.status(400).json({ error: "Informe todos os campos" })
        }
 
        const newCurso = await prisma.cursos.create({
            data: { title, descricao, instrutorId }
        })
 
        return res.json(newCurso)
    } catch (error) {
        console.error(error)
 
        return res.status(500).json({
            error: "Erro ao criar novo curso",
            details: error
        })
    }
})
 
//Remove um curso
router.delete("/curso/:id", async (req: Request, res: Response) => {
    try {
        await prisma.cursos.delete({
            where: { id: Number(req.params.id) }
        })
 
        return res.status(204).send()
    } catch (error) {
        res.status(500).json({ error: "Erro interno no servidor" })
    }
})
 
//Atualiza um curso
router.put("/curso/:id", async (req: Request, res: Response) => {
    try {
        const id = Number(req.params.id)
 
        const { title, descricao, instrutorId } = req.body
        const CursoUpdate = await prisma.cursos.update({
            where: { id },
            data: { title, descricao, instrutorId }
        })
 
        res.json(CursoUpdate)
    } catch (error) {
        console.error(error)
 
        return res.status(500).json({
            error: "Erro ao atualizar curso"
        })
    }
})
 
//instrutores/////////////////////////////////////////////////////////////////////////////////
 
//lista todos os instrutores
router.get("/instrutor", async (req: Request, res: Response) => {
    try {
        const instrutores = await prisma.instrutor.findMany({ include: { cursos: true } });
        return res.status(200).json(instrutores)
    } catch (error) {
        res.status(500).json({ error: "Erro ao buscar instrutores" })
    }
})
 
//Busca um instrutor pelo id
router.get("/instrutor/:id", async (req: Request, res: Response) => {
 
    const id = Number(req.params.id)
    const instrutor = await prisma.instrutor.findUnique({
        where: { id }
    })
 
    return res.status(200).json(instrutor)
})
 
//Cadastra um novo instrutor
router.post("/instrutor", async (req: Request, res: Response) => {
    const { name, email } = req.body
 
    if (!name || !email) {
        return res.status(400).json({ error: "Informe todos os campos" })
    }
 
    const newInstrutor = await prisma.instrutor.create({
        data: { name, email }
    })
 
    return res.json(newInstrutor)
})
 
//Remove um instrutor
router.delete("/instrutor/:id", async (req: Request, res: Response) => {
    try {
        await prisma.instrutor.delete({
            where: { id: Number(req.params.id) }
        })
 
        return res.status(204).send()
    } catch (error) {
        res.status(500).json({ error: "Erro interno no servidor" })
    }
})
 
//Atualiza um instrutor
router.put("/instrutor/:id", async (req: Request, res: Response) => {
    try {
        const id = Number(req.params.id)
 
        const { name, email } = req.body
        const instrutorUpdate = await prisma.instrutor.update({
            where: { id },
            data: { name, email }
        })
 
        res.json(instrutorUpdate)
    } catch (error) {
 
    }
})
 
export default router;
