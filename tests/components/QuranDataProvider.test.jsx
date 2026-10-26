import { beforeEach, describe, expect, it, vi } from 'vitest'
import { fireEvent, render, screen, waitFor } from '@testing-library/react'
import { QuranDataProvider } from '@features/quran/QuranDataProvider'
import { useQuranData } from '@features/quran/hooks/useQuranData'
import { fetchSurahs } from '@features/quran/api/itqanApi'
import { SURAHS } from '../fixtures/surahs'

vi.mock('@features/quran/api/itqanApi', () => ({
  fetchSurahs: vi.fn(),
}))

function Probe() {
  const { surahs, isLoading, error, retry } = useQuranData()

  return (
    <div>
      <p data-testid="state">
        {isLoading ? 'loading' : error ? 'error' : String(surahs.length)}
      </p>
      <button onClick={retry}>retry</button>
    </div>
  )
}

function renderProvider() {
  return render(
    <QuranDataProvider>
      <Probe />
    </QuranDataProvider>,
  )
}

beforeEach(() => {
  vi.mocked(fetchSurahs).mockReset()
})

describe('QuranDataProvider', () => {
  it('should fetch surahs on mount', async () => {
    vi.mocked(fetchSurahs).mockResolvedValue(SURAHS)

    renderProvider()

    expect(screen.getByTestId('state')).toHaveTextContent('loading')
    await waitFor(() => expect(screen.getByTestId('state')).toHaveTextContent('114'))
    expect(fetchSurahs).toHaveBeenCalledTimes(1)
  })

  it('should surface fetch errors', async () => {
    vi.mocked(fetchSurahs).mockRejectedValue(new Error('Network error'))

    renderProvider()

    await waitFor(() => expect(screen.getByTestId('state')).toHaveTextContent('error'))
  })

  it('should retry after a failure', async () => {
    vi.mocked(fetchSurahs)
      .mockRejectedValueOnce(new Error('Network error'))
      .mockResolvedValueOnce(SURAHS)

    renderProvider()

    await waitFor(() => expect(screen.getByTestId('state')).toHaveTextContent('error'))
    fireEvent.click(screen.getByRole('button', { name: 'retry' }))
    await waitFor(() => expect(screen.getByTestId('state')).toHaveTextContent('114'))
    expect(fetchSurahs).toHaveBeenCalledTimes(2)
  })
})
