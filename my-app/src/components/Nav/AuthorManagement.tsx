import React, { useState, useEffect } from "react";
import { Button } from "./ui/button";
import { Card, CardContent } from "./ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "./ui/table";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "./ui/dialog";
import { Input } from "./ui/input";
import { Alert } from "./ui/alert";
import './BookManagement.css';

interface Author {
  id: number;
  name: string;
  biography: string;
}

const AuthorManager: React.FC = () => {
  const [authors, setAuthors] = useState<Author[]>([]);
  const [newAuthor, setNewAuthor] = useState({ name: "", biography: "" });
  const [selectedAuthor, setSelectedAuthor] = useState<Author | null>(null);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const [authorToDelete, setAuthorToDelete] = useState<Author | null>(null);

  useEffect(() => {
    const savedAuthors = localStorage.getItem("authors");
    if (savedAuthors) {
      setAuthors(JSON.parse(savedAuthors));
    }
  }, []);

  useEffect(() => {
    if (authors.length > 0) {
      localStorage.setItem("authors", JSON.stringify(authors));
    }
  }, [authors]);

  const handleCreateAuthor = () => {
    const newEntry = { id: Date.now(), ...newAuthor };
    setAuthors((prevAuthors) => [...prevAuthors, newEntry]);
    setIsCreateModalOpen(false);
    setNewAuthor({ name: "", biography: "" });
  };

  const handleDeleteAuthor = (id: number) => {
    setAuthors((prevAuthors) => prevAuthors.filter((author) => author.id !== id));
    setAuthorToDelete(null);
  };

  return (
    <div className="p-4">
      <Button onClick={() => setIsCreateModalOpen(true)}>Adicionar Autor</Button>
      <Table className="mt-4">
        <TableHeader>
          <TableRow>
            <TableHead>Nome</TableHead>
            <TableHead>Biografia</TableHead>
            <TableHead>Ações</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {authors.map((author) => (
            <TableRow key={author.id}>
              <TableCell>{author.name}</TableCell>
              <TableCell>{author.biography}</TableCell>
              <TableCell>
                <Button onClick={() => { setSelectedAuthor(author); setIsDetailModalOpen(true); }}>Detalhes</Button>
                <Button variant="destructive" onClick={() => setAuthorToDelete(author)}>Excluir</Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {/* Modal de criação */}
      <Dialog open={isCreateModalOpen} onOpenChange={setIsCreateModalOpen}>
        <div className="dialog-overlay" onClick={() => setIsCreateModalOpen(false)}></div>
        <div className="dialog-content" onClick={(e) => e.stopPropagation()}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Criar Autor</DialogTitle>
          </DialogHeader>
          <Input placeholder="Nome" value={newAuthor.name} onChange={(e) => setNewAuthor({ ...newAuthor, name: e.target.value })} />
          <Input placeholder="Biografia" value={newAuthor.biography} onChange={(e) => setNewAuthor({ ...newAuthor, biography: e.target.value })} />
          <DialogFooter>
            <Button onClick={handleCreateAuthor}>Criar</Button>
          </DialogFooter>
        </DialogContent>
        </div>
      </Dialog>

      {/* Modal de detalhes */}
      <Dialog open={isDetailModalOpen} onOpenChange={setIsDetailModalOpen}>
        <div className="dialog-overlay" onClick={() => setIsCreateModalOpen(false)}></div>
        <div className="dialog-content" onClick={(e) => e.stopPropagation()}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Detalhes do Autor</DialogTitle>
          </DialogHeader>
          {selectedAuthor && (
            <Card>
              <CardContent>
                <p><strong>Nome:</strong> {selectedAuthor.name}</p>
                <p><strong>Biografia:</strong> {selectedAuthor.biography}</p>
              </CardContent>
            </Card>
          )}
          <div className="button-close">
          <Button variant="destructive" onClick={() => setIsDetailModalOpen(false)}>X</Button>
          </div>
        </DialogContent>
        </div>
      </Dialog>

      {/* Alerta de confirmação para exclusão */}
      {authorToDelete && (
        <div className="dialog-content" onClick={(e) => e.stopPropagation()}>
        <Alert>
          <p>Tem certeza que deseja excluir o autor "{authorToDelete.name}"?</p>
          <Button variant="destructive" onClick={() => handleDeleteAuthor(authorToDelete.id)}>Confirmar</Button>
          <Button onClick={() => setAuthorToDelete(null)}>Cancelar</Button>
        </Alert>
        </div>
      )}
    </div>
  );
};

export default AuthorManager;
