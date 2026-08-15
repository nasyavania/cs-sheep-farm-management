export type JenisKelamin = "jantan" | "betina";
export type AsalDomba = "lahir_di_peternakan" | "beli_luar";
export type KondisiKesehatan = "sehat" | "kurang_fit" | "sakit";

export type Domba = {
  id: string;
  kode: string;
  tanggal_lahir: string | null;
  jenis_kelamin: JenisKelamin;
  ras: string | null;
  id_induk_jantan: string | null;
  id_induk_betina: string | null;
  asal: AsalDomba;
  kondisi_kesehatan: KondisiKesehatan;
  catatan_sakit: string | null;
  created_at: string;
  updated_at: string;
};

export type RiwayatObat = {
  id: string;
  id_domba: string;
  nama_obat: string;
  tanggal_pemberian: string;
  dosis: string | null;
  catatan: string | null;
  created_at: string;
};
