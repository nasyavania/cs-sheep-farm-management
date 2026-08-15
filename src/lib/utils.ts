export function cn(...classes: Array<string | undefined | false | null>) {
  return classes.filter(Boolean).join(" ");
}

/**
 * Menghitung usia domba dalam format yang mudah dibaca peternak,
 * contoh: "Baru lahir", "3 bulan", "1 tahun 4 bulan"
 */
export function hitungUsia(tanggalLahir: string | null): string {
  if (!tanggalLahir) return "Tidak diketahui";

  const lahir = new Date(tanggalLahir);
  const sekarang = new Date();

  let totalBulan =
    (sekarang.getFullYear() - lahir.getFullYear()) * 12 +
    (sekarang.getMonth() - lahir.getMonth());

  if (sekarang.getDate() < lahir.getDate()) {
    totalBulan -= 1;
  }

  if (totalBulan < 1) return "Baru lahir";
  if (totalBulan < 12) return `${totalBulan} bulan`;

  const tahun = Math.floor(totalBulan / 12);
  const sisaBulan = totalBulan % 12;

  return sisaBulan > 0 ? `${tahun} tahun ${sisaBulan} bulan` : `${tahun} tahun`;
}

export function formatTanggal(tanggal: string): string {
  return new Date(tanggal).toLocaleDateString("id-ID", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

export const labelJenisKelamin = (jk: "jantan" | "betina") =>
  jk === "jantan" ? "Jantan" : "Betina";

export const labelAsal = (asal: "lahir_di_peternakan" | "beli_luar") =>
  asal === "lahir_di_peternakan" ? "Lahir di peternakan" : "Beli dari luar";

export const labelKondisi = (
  kondisi: "sehat" | "kurang_fit" | "sakit"
) => {
  const label = { sehat: "Sehat", kurang_fit: "Kurang Fit", sakit: "Sakit" };
  return label[kondisi];
};
