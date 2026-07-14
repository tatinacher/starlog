import type { UUID } from '@/shared/types'
import type { Instrument, CreateInstrumentDto, UpdateInstrumentDto } from '../model/instrument.types'

/**
 * Контракт репозитория инструментов.
 * Реализация появится когда фича управления инструментами будет добавлена в UI.
 */
export interface InstrumentRepository {
  /** Найти инструмент по ID. */
  findById(id: UUID): Promise<Instrument | null>

  /** Вернуть все инструменты пользователя. */
  findAll(): Promise<Instrument[]>

  /** Создать новый инструмент. */
  create(dto: CreateInstrumentDto): Promise<Instrument>

  /** Обновить инструмент. Возвращает обновлённый объект. */
  update(id: UUID, dto: UpdateInstrumentDto): Promise<Instrument>

  /** Удалить инструмент. */
  delete(id: UUID): Promise<void>
}
