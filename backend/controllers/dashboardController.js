
const User = require('../models/userModel');

// Função que retorna os dados reais do dashboard
exports.getDashboardData = async (req, res) => {
  try {
    const totalEmprestimos = await Book.aggregate([
      { $group: { _id: null, total: { $sum: '$loans' } } }
    ]);
    const totalLivros = await Book.countDocuments();
    const totalUsuarios = await User.countDocuments();

    const dashboardData = {
      loanStatus: `${totalEmprestimos[0].total} Empréstimos pendentes`,
      returnStatus: "5 Devoluções pendentes",  // Pode ser modificado conforme a lógica
      reservationStatus: "2 Reservas aguardando"  // Pode ser modificado conforme a lógica
    };

    res.json({ status: 'success', data: dashboardData });
  } catch (error) {
    console.error(error);
    res.status(500).json({ status: 'error', message: 'Erro ao buscar dados do dashboard' });
  }
};
